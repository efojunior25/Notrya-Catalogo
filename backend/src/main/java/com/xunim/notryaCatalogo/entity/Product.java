package com.xunim.notryaCatalogo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "price", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ProductCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "size", nullable = false)
    private Size size;

    @Enumerated(EnumType.STRING)
    @Column(name = "color", nullable = false)
    private Color color;

    @Column(name = "brand", length = 80)
    private String brand;

    @Column(name = "material", length = 100)
    private String material;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "active", nullable = false)
    private Boolean active = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    @Column(name = "version", nullable = false)
    private Integer version = 0;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Enums
    public enum ProductCategory {
        CAMISETA("Camiseta"),
        CALCA("Calça"),
        BERMUDA("Bermuda"),
        SHORTS("Shorts"),
        VESTIDO("Vestido"),
        SAIA("Saia"),
        BLUSA("Blusa"),
        JAQUETA("Jaqueta"),
        CASACO("Casaco"),
        TENIS("Tênis"),
        SAPATO("Sapato"),
        SANDALIA("Sandália"),
        BONE("Boné"),
        CHAPEU("Chapéu"),
        BOLSA("Bolsa"),
        MOCHILA("Mochila"),
        CARTEIRA("Carteira"),
        CINTO("Cinto");

        private final String displayName;

        ProductCategory(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum Size {
        PP("PP"),
        P("P"),
        M("M"),
        G("G"),
        GG("GG"),
        XG("XG"),
        XXG("XXG"),
        TAMANHO_34("34"),
        TAMANHO_36("36"),
        TAMANHO_38("38"),
        TAMANHO_40("40"),
        TAMANHO_42("42"),
        TAMANHO_44("44"),
        TAMANHO_46("46"),
        TAMANHO_48("48"),
        UNICO("Único");

        private final String displayName;

        Size(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum Color {
        AZUL("Azul"),
        PRETO("Preto"),
        BRANCO("Branco"),
        VERMELHO("Vermelho"),
        VERDE("Verde"),
        AMARELO("Amarelo"),
        ROSA("Rosa"),
        ROXO("Roxo"),
        LARANJA("Laranja"),
        MARROM("Marrom"),
        CINZA("Cinza"),
        BEGE("Bege"),
        NAVY("Navy"),
        VINHO("Vinho"),
        CREME("Creme"),
        DOURADO("Dourado"),
        PRATEADO("Prateado"),
        MULTICOLOR("Multicolor");

        private final String displayName;

        Color(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum Gender {
        MASCULINO("Masculino"),
        FEMININO("Feminino"),
        UNISSEX("Unissex");

        private final String displayName;

        Gender(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}