package com.xunim.notryaCatalogo.controller;

import com.xunim.notryaCatalogo.dto.ProductCreateDTO;
import com.xunim.notryaCatalogo.dto.ProductDTO;
import com.xunim.notryaCatalogo.service.AdminProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminProductService adminProductService;

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductCreateDTO productData) {
        ProductDTO createdProduct = adminProductService.createProduct(productData);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
                                                    @Valid @RequestBody ProductCreateDTO productData) {
        ProductDTO updatedProduct = adminProductService.updateProduct(id, productData);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        adminProductService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
