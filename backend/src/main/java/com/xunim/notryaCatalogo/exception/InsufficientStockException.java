package com.xunim.notryaCatalogo.exception;

import com.xunim.notryaCatalogo.dto.StockErrorDTO;
import lombok.Getter;

import java.util.List;

@Getter
public class InsufficientStockException extends RuntimeException {

    private final List<StockErrorDTO> stockErrors;

    public InsufficientStockException(List<StockErrorDTO> stockErrors) {
        super("Estoque insuficiente para alguns itens");
        this.stockErrors = stockErrors;
    }
}
