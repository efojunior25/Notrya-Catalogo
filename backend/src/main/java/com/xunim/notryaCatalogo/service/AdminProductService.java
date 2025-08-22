package com.xunim.notryaCatalogo.service;

import com.xunim.notryaCatalogo.dto.ProductCreateDTO;
import com.xunim.notryaCatalogo.dto.ProductDTO;
import com.xunim.notryaCatalogo.entity.Product;
import com.xunim.notryaCatalogo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminProductService {

    private final ProductRepository productRepository;

    @Transactional
    public ProductDTO createProduct(ProductCreateDTO createDTO) {
        Product product = new Product();
        product.setName(createDTO.getName());
        product.setDescription(createDTO.getDescription());
        product.setPrice(createDTO.getPrice());
        product.setStock(createDTO.getStock());
        product.setBrand(createDTO.getBrand());
        product.setMaterial(createDTO.getMaterial());
        product.setImageUrl(createDTO.getImageUrl());
        product.setActive(true);

        // Converter strings para enums
        try {
            product.setCategory(Product.ProductCategory.valueOf(createDTO.getCategory().toUpperCase()));
            product.setSize(Product.Size.valueOf(createDTO.getSize().toUpperCase()));
            product.setColor(Product.Color.valueOf(createDTO.getColor().toUpperCase()));
            product.setGender(Product.Gender.valueOf(createDTO.getGender().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Valor inválido para categoria, tamanho, cor ou gênero");
        }

        Product savedProduct = productRepository.save(product);
        return new ProductDTO(savedProduct);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductCreateDTO updateDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setName(updateDTO.getName());
        product.setDescription(updateDTO.getDescription());
        product.setPrice(updateDTO.getPrice());
        product.setStock(updateDTO.getStock());
        product.setBrand(updateDTO.getBrand());
        product.setMaterial(updateDTO.getMaterial());
        product.setImageUrl(updateDTO.getImageUrl());

        // Converter strings para enums
        try {
            product.setCategory(Product.ProductCategory.valueOf(updateDTO.getCategory().toUpperCase()));
            product.setSize(Product.Size.valueOf(updateDTO.getSize().toUpperCase()));
            product.setColor(Product.Color.valueOf(updateDTO.getColor().toUpperCase()));
            product.setGender(Product.Gender.valueOf(updateDTO.getGender().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Valor inválido para categoria, tamanho, cor ou gênero");
        }

        Product savedProduct = productRepository.save(product);
        return new ProductDTO(savedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setActive(false);
        productRepository.save(product);
    }
}
