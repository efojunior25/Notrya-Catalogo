package com.xunim.notryaCatalogo.controller;

import com.xunim.notryaCatalogo.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("uploads")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class FileUploadController {

    @Value("${upload.dir:../uploads/}")
    private String uploadDir;

    @Value("${spring.servlet.multipart.max-file-size:5MB}")
    private String maxFileSize;

    private final ImageUtil imageUtil;

    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"
    );

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @PostMapping("/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("file") MultipartFile file) {
        log.info("Iniciando upload de imagem: {}", file.getOriginalFilename());

        try {
            // Validações
            Map<String, Object> validation = validateFile(file);
            if (validation.containsKey("error")) {
                return ResponseEntity.badRequest().body(validation);
            }

            // Criar diretório se não existir
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                log.info("Diretório de upload criado: {}", uploadPath);
            }

            // Gerar nome único para o arquivo
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = getFileExtension(originalFilename);
            String fileName = UUID.randomUUID().toString() + fileExtension;

            // Salvar arquivo
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Validar imagem salva
            byte[] imageData = Files.readAllBytes(targetLocation);
            if (!imageUtil.isValidImage(imageData)) {
                Files.deleteIfExists(targetLocation);
                return ResponseEntity.badRequest().body(
                        Map.of("error", "Arquivo corrompido ou formato inválido")
                );
            }

            // Obter informações da imagem
            int[] dimensions = imageUtil.getImageDimensions(imageData);

            // Retornar informações completas
            String fileUrl = "/api/v1/uploads/images/" + fileName;

            Map<String, Object> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("filename", fileName);
            response.put("originalName", originalFilename);
            response.put("size", file.getSize());
            response.put("width", dimensions[0]);
            response.put("height", dimensions[1]);
            response.put("contentType", file.getContentType());

            log.info("Upload concluído com sucesso: {} -> {}", originalFilename, fileName);
            return ResponseEntity.ok(response);

        } catch (IOException ex) {
            log.error("Erro no upload da imagem: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro interno no servidor", "details", ex.getMessage()));
        }
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(file);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600")
                        .body(resource);
            } else {
                log.warn("Imagem não encontrada: {}", filename);
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            log.error("URL malformada para imagem: {}", filename);
            return ResponseEntity.badRequest().build();
        } catch (IOException ex) {
            log.error("Erro ao servir imagem {}: {}", filename, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/images/{filename}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteImage(@PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename);
            if (Files.exists(file)) {
                Files.delete(file);
                log.info("Imagem deletada: {}", filename);
                return ResponseEntity.ok(Map.of("message", "Imagem deletada com sucesso"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException ex) {
            log.error("Erro ao deletar imagem {}: {}", filename, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao deletar imagem"));
        }
    }

    @GetMapping("/info")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getUploadInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("uploadDir", uploadDir);
        info.put("maxFileSize", maxFileSize);
        info.put("allowedTypes", ALLOWED_CONTENT_TYPES);

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (Files.exists(uploadPath)) {
                long totalFiles = Files.list(uploadPath).count();
                info.put("totalFiles", totalFiles);
            } else {
                info.put("totalFiles", 0);
                info.put("warning", "Diretório de upload não existe");
            }
        } catch (IOException e) {
            info.put("error", "Erro ao acessar diretório de upload");
        }

        return ResponseEntity.ok(info);
    }

    private Map<String, Object> validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            return Map.of("error", "Arquivo vazio");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return Map.of("error", "Arquivo muito grande. Máximo permitido: " + (MAX_FILE_SIZE / 1024 / 1024) + "MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            return Map.of("error", "Tipo de arquivo não permitido. Tipos aceitos: " + ALLOWED_CONTENT_TYPES);
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.contains("..")) {
            return Map.of("error", "Nome de arquivo inválido");
        }

        return Map.of("valid", true);
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return ".jpg"; // extensão padrão
        }
        return filename.substring(filename.lastIndexOf(".")).toLowerCase();
    }
}