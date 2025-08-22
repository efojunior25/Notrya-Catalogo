package com.xunim.notryaCatalogo.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 120, message = "Nome deve ter no máximo 120 caracteres")
    private String name;

    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    private String description;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    private BigDecimal price;

    @NotNull(message = "Estoque é obrigatório")
    @Min(value = 0, message = "Estoque não pode ser negativo")
    private Integer stock;

    @NotBlank(message = "Categoria é obrigatória")
    private String category;

    @NotBlank(message = "Tamanho é obrigatório")
    private String size;

    @NotBlank(message = "Cor é obrigatória")
    private String color;

    @Size(max = 80, message = "Marca deve ter no máximo 80 caracteres")
    private String brand;

    @Size(max = 100, message = "Material deve ter no máximo 100 caracteres")
    private String material;

    @NotBlank(message = "Gênero é obrigatório")
    private String gender;

    @Size(max = 500, message = "URL da imagem deve ter no máximo 500 caracteres")
    private String imageUrl;
}
