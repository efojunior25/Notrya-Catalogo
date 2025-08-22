package com.xunim.notryaCatalogo.controller;

import com.xunim.notryaCatalogo.dto.ProductPageDTO;
import com.xunim.notryaCatalogo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ProductController {

    private final ProductService productService;

    // Endpoint principal com todos os filtros
    @GetMapping
    public ResponseEntity<ProductPageDTO> getProducts(
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "color", required = false) String color,
            @RequestParam(value = "size_", required = false) String size_,
            @RequestParam(value = "brand", required = false) String brand) {

        ProductPageDTO products = productService.findProducts(
                search, page, size, category, gender, color, size_, brand
        );
        return ResponseEntity.ok(products);
    }

    // Endpoint para buscar por categoria
    @GetMapping("/category/{category}")
    public ResponseEntity<ProductPageDTO> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size) {

        ProductPageDTO products = productService.findProductsByCategory(category, page, size);
        return ResponseEntity.ok(products);
    }

    // Endpoint para buscar por gênero
    @GetMapping("/gender/{gender}")
    public ResponseEntity<ProductPageDTO> getProductsByGender(
            @PathVariable String gender,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size) {

        ProductPageDTO products = productService.findProductsByGender(gender, page, size);
        return ResponseEntity.ok(products);
    }

    // Endpoint para promoções (produtos com estoque baixo)
    @GetMapping("/promotions")
    public ResponseEntity<ProductPageDTO> getPromotionProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size) {

        ProductPageDTO products = productService.findPromotionProducts(page, size);
        return ResponseEntity.ok(products);
    }

    // Endpoint para novidades
    @GetMapping("/newest")
    public ResponseEntity<ProductPageDTO> getNewestProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "12") int size) {

        ProductPageDTO products = productService.findNewestProducts(page, size);
        return ResponseEntity.ok(products);
    }

    // Endpoint para produtos relacionados
    @GetMapping("/{productId}/related")
    public ResponseEntity<ProductPageDTO> getRelatedProducts(
            @PathVariable Long productId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "6") int size) {

        ProductPageDTO products = productService.findRelatedProducts(productId, page, size);
        return ResponseEntity.ok(products);
    }

    // Endpoint para buscar tamanhos disponíveis
    @GetMapping("/sizes")
    public ResponseEntity<List<String>> getAvailableSizes(
            @RequestParam("name") String productName,
            @RequestParam("color") String color,
            @RequestParam("category") String category) {

        List<String> sizes = productService.findAvailableSizes(productName, color, category);
        return ResponseEntity.ok(sizes);
    }

    // Endpoint para buscar cores disponíveis
    @GetMapping("/colors")
    public ResponseEntity<List<String>> getAvailableColors(
            @RequestParam("name") String productName,
            @RequestParam("category") String category) {

        List<String> colors = productService.findAvailableColors(productName, category);
        return ResponseEntity.ok(colors);
    }

    // Endpoint para obter todas as categorias disponíveis
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = List.of(
                "CAMISETA", "CALCA", "BERMUDA", "SHORTS", "VESTIDO",
                "SAIA", "BLUSA", "JAQUETA", "CASACO", "TENIS",
                "SAPATO", "SANDALIA", "BONE", "CHAPEU", "BOLSA",
                "MOCHILA", "CARTEIRA", "CINTO"
        );
        return ResponseEntity.ok(categories);
    }

    // Endpoint para obter todos os gêneros disponíveis
    @GetMapping("/genders")
    public ResponseEntity<List<String>> getGenders() {
        List<String> genders = List.of("MASCULINO", "FEMININO", "UNISSEX");
        return ResponseEntity.ok(genders);
    }

    // Endpoint para obter todas as cores disponíveis
    @GetMapping("/all-colors")
    public ResponseEntity<List<String>> getAllColors() {
        List<String> colors = List.of(
                "AZUL", "PRETO", "BRANCO", "VERMELHO", "VERDE",
                "AMARELO", "ROSA", "ROXO", "LARANJA", "MARROM",
                "CINZA", "BEGE", "NAVY", "VINHO", "CREME",
                "DOURADO", "PRATEADO", "MULTICOLOR"
        );
        return ResponseEntity.ok(colors);
    }

    // Endpoint para obter todos os tamanhos disponíveis
    @GetMapping("/all-sizes")
    public ResponseEntity<List<String>> getAllSizes() {
        List<String> sizes = List.of(
                "PP", "P", "M", "G", "GG", "XG", "XXG",
                "TAMANHO_34", "TAMANHO_36", "TAMANHO_38", "TAMANHO_40",
                "TAMANHO_42", "TAMANHO_44", "TAMANHO_46", "TAMANHO_48",
                "UNICO"
        );
        return ResponseEntity.ok(sizes);
    }
}