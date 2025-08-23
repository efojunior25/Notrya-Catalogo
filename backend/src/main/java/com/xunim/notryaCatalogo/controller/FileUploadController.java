package com.xunim.notryaCatalogo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class FileUploadController {

    @Value("${file.upload-dir:../uploads/}")
    private String uploadDir;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String[] ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"};

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Validações
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(createErrorResponse("Arquivo não selecionado"));
            }

            if (file.getSize() > MAX_FILE_SIZE) {
                return ResponseEntity.badRequest().body(createErrorResponse("Arquivo muito grande. Máximo 5MB"));
            }

            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                return ResponseEntity.badRequest().body(createErrorResponse("Nome do arquivo inválido"));
            }

            String fileExtension = getFileExtension(originalFilename);
            if (!isValidExtension(fileExtension)) {
                return ResponseEntity.badRequest().body(createErrorResponse("Tipo de arquivo não permitido. Use: jpg, jpeg, png, gif, webp"));
            }

            // Verificar se é uma imagem válida
            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body(createErrorResponse("Arquivo não é uma imagem válida"));
            }

            // Criar diretório se não existir
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                log.info("Diretório de upload criado: {}", uploadPath.toAbsolutePath());
            }

            // Gerar nome único para o arquivo
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String uuid = UUID.randomUUID().toString().substring(0, 8);
            String filename = String.format("product_%s_%s.%s", timestamp, uuid, fileExtension);

            // Salvar arquivo
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            log.info("Arquivo salvo com sucesso: {}", filePath.toAbsolutePath());

            // Retornar resposta com URL relativa
            String fileUrl = "/uploads/" + filename;
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("filename", filename);
            response.put("url", fileUrl);
            response.put("originalName", originalFilename);
            response.put("size", file.getSize());

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            log.error("Erro ao fazer upload do arquivo: ", e);
            return ResponseEntity.internalServerError().body(createErrorResponse("Erro interno no servidor"));
        } catch (Exception e) {
            log.error("Erro inesperado no upload: ", e);
            return ResponseEntity.internalServerError().body(createErrorResponse("Erro inesperado"));
        }
    }

    @DeleteMapping("/image/{filename}")
    public ResponseEntity<?> deleteImage(@PathVariable String filename) {
        try {
            // Validar nome do arquivo para segurança
            if (!isValidFilename(filename)) {
                return ResponseEntity.badRequest().body(createErrorResponse("Nome de arquivo inválido"));
            }

            Path filePath = Paths.get(uploadDir).resolve(filename);

            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Files.delete(filePath);
            log.info("Arquivo deletado com sucesso: {}", filePath.toAbsolutePath());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Arquivo deletado com sucesso");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            log.error("Erro ao deletar arquivo: ", e);
            return ResponseEntity.internalServerError().body(createErrorResponse("Erro ao deletar arquivo"));
        } catch (Exception e) {
            log.error("Erro inesperado ao deletar: ", e);
            return ResponseEntity.internalServerError().body(createErrorResponse("Erro inesperado"));
        }
    }

    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }

    private boolean isValidExtension(String extension) {
        for (String allowed : ALLOWED_EXTENSIONS) {
            if (allowed.equals(extension)) {
                return true;
            }
        }
        return false;
    }

    private boolean isValidFilename(String filename) {
        // Verificar se o nome do arquivo contém apenas caracteres seguros
        return filename != null &&
                filename.matches("^[a-zA-Z0-9._-]+$") &&
                !filename.contains("..") &&
                filename.length() > 0 &&
                filename.length() < 255;
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("error", message);
        return error;
    }
}