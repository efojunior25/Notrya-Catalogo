package com.xunim.notryaCatalogo.service;

import com.xunim.notryaCatalogo.dto.ProductDTO;
import com.xunim.notryaCatalogo.dto.ProductPageDTO;
import com.xunim.notryaCatalogo.entity.Product;
import com.xunim.notryaCatalogo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Busca principal com filtros para roupas
    public ProductPageDTO findProducts(String search, int page, int size,
                                       String category, String gender,
                                       String color, String size_, String brand) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());

        Product.ProductCategory categoryEnum = null;
        Product.Gender genderEnum = null;
        Product.Color colorEnum = null;
        Product.Size sizeEnum = null;

        // Converter strings para enums
        if (category != null && !category.isEmpty()) {
            try {
                categoryEnum = Product.ProductCategory.valueOf(category.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Ignorar categoria inválida
            }
        }

        if (gender != null && !gender.isEmpty()) {
            try {
                genderEnum = Product.Gender.valueOf(gender.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Ignorar gênero inválido
            }
        }

        if (color != null && !color.isEmpty()) {
            try {
                colorEnum = Product.Color.valueOf(color.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Ignorar cor inválida
            }
        }

        if (size_ != null && !size_.isEmpty()) {
            try {
                sizeEnum = Product.Size.valueOf(size_.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Ignorar tamanho inválido
            }
        }

        Page<Product> productPage = productRepository.findProductsWithFilters(
                search, categoryEnum, genderEnum, colorEnum, sizeEnum, brand, pageable
        );

        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new ProductPageDTO(
                productDTOs,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isFirst(),
                productPage.isLast()
        );
    }

    // Busca simples (mantida para compatibilidade)
    public ProductPageDTO findProducts(String search, int page, int size) {
        return findProducts(search, page, size, null, null, null, null, null);
    }

    // Buscar por categoria
    public ProductPageDTO findProductsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());

        try {
            Product.ProductCategory categoryEnum = Product.ProductCategory.valueOf(category.toUpperCase());
            Page<Product> productPage = productRepository.findByCategory(categoryEnum, pageable);

            List<ProductDTO> productDTOs = productPage.getContent().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return new ProductPageDTO(
                    productDTOs,
                    productPage.getNumber(),
                    productPage.getSize(),
                    productPage.getTotalElements(),
                    productPage.getTotalPages(),
                    productPage.isFirst(),
                    productPage.isLast()
            );
        } catch (IllegalArgumentException e) {
            // Retornar página vazia se categoria inválida
            return new ProductPageDTO(List.of(), 0, size, 0, 0, true, true);
        }
    }

    // Buscar por gênero
    public ProductPageDTO findProductsByGender(String gender, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());

        try {
            Product.Gender genderEnum = Product.Gender.valueOf(gender.toUpperCase());
            Page<Product> productPage = productRepository.findByGender(genderEnum, pageable);

            List<ProductDTO> productDTOs = productPage.getContent().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return new ProductPageDTO(
                    productDTOs,
                    productPage.getNumber(),
                    productPage.getSize(),
                    productPage.getTotalElements(),
                    productPage.getTotalPages(),
                    productPage.isFirst(),
                    productPage.isLast()
            );
        } catch (IllegalArgumentException e) {
            return new ProductPageDTO(List.of(), 0, size, 0, 0, true, true);
        }
    }

    // Produtos em promoção (estoque baixo)
    public ProductPageDTO findPromotionProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("stock").ascending());
        Page<Product> productPage = productRepository.findLowStockProducts(5, pageable);

        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new ProductPageDTO(
                productDTOs,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isFirst(),
                productPage.isLast()
        );
    }

    // Novidades
    public ProductPageDTO findNewestProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findNewestProducts(pageable);

        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new ProductPageDTO(
                productDTOs,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isFirst(),
                productPage.isLast()
        );
    }

    // Produtos relacionados
    public ProductPageDTO findRelatedProducts(Long productId, int page, int size) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            return new ProductPageDTO(List.of(), 0, size, 0, 0, true, true);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Product> productPage = productRepository.findRelatedProducts(
                product.getCategory(), product.getGender(), productId, pageable
        );

        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new ProductPageDTO(
                productDTOs,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isFirst(),
                productPage.isLast()
        );
    }

    // Buscar tamanhos disponíveis
    public List<String> findAvailableSizes(String productName, String color, String category) {
        try {
            Product.Color colorEnum = Product.Color.valueOf(color.toUpperCase());
            Product.ProductCategory categoryEnum = Product.ProductCategory.valueOf(category.toUpperCase());

            return productRepository.findAvailableSizes(productName, colorEnum, categoryEnum)
                    .stream()
                    .map(Product.Size::getDisplayName)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    // Buscar cores disponíveis
    public List<String> findAvailableColors(String productName, String category) {
        try {
            Product.ProductCategory categoryEnum = Product.ProductCategory.valueOf(category.toUpperCase());

            return productRepository.findAvailableColors(productName, categoryEnum)
                    .stream()
                    .map(Product.Color::getDisplayName)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    public List<Product> findProductsByIds(List<Long> productIds) {
        return productRepository.findActiveProductByIds(productIds);
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(product);
    }
}