package com.xunim.notryaCatalogo.config;

import com.xunim.notryaCatalogo.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        log.info("Verificando se usuário admin padrão existe...");
        authService.createDefaultAdmin();
        log.info("Usuário admin padrão criado/verificado com sucesso!");
        log.info("Login: admin | Senha: admin123");
    }
}
