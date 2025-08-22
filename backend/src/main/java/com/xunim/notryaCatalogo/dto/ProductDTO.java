package com.xunim.notryaCatalogo.dto;

import com.xunim.notryaCatalogo.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String category;
    private String size;
    private String color;
    private String brand;
    private String material;
    private String gender;
    private String imageUrl;
    private Boolean active;
    private LocalDateTime createdAt;

    // Constructor para facilitar conversão
    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.stock = product.getStock();
        this.category = product.getCategory() != null ? product.getCategory().getDisplayName() : null;
        this.size = product.getSize() != null ? product.getSize().getDisplayName() : null;
        this.color = product.getColor() != null ? product.getColor().getDisplayName() : null;
        this.brand = product.getBrand();
        this.material = product.getMaterial();
        this.gender = product.getGender() != null ? product.getGender().getDisplayName() : null;
        this.imageUrl = product.getImageUrl();
        this.active = product.getActive();
        this.createdAt = product.getCreatedAt();
    }
}
