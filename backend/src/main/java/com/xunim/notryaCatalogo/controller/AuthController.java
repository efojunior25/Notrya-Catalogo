package com.xunim.notryaCatalogo.controller;

import com.xunim.notryaCatalogo.dto.request.LoginRequestDTO;
import com.xunim.notryaCatalogo.dto.response.LoginResponseDTO;
import com.xunim.notryaCatalogo.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validateToken() {
        return ResponseEntity.ok("Token válido");
    }
}
