#!/bin/bash
# dev-h2.sh - Script para rodar com H2

echo -e "\033[32m🚀 Iniciando aplicação com H2 (Testes)...\033[0m"

if [[ ! -d "backend" || ! -d "frontend" ]]; then
    echo -e "\033[31m❌ Execute este script na raiz do projeto!\033[0m"
    exit 1
fi

start_backend_h2() {
    echo -e "\033[34m🔧 Iniciando Backend com H2...\033[0m"
    (cd backend && ./mvnw spring-boot:run -Dspring-boot.run.profiles=test)
}

start_frontend() {
    if [[ -f "frontend/package.json" ]]; then
        echo -e "\033[34m🎨 Iniciando Frontend...\033[0m"
        (cd frontend && npm start)
    else
        echo -e "\033[33m⚠️  Frontend não configurado\033[0m"
    fi
}

# Abrir terminais separados
gnome-terminal -- bash -c "cd backend && echo 'Iniciando com H2...' && ./mvnw spring-boot:run -Dspring-boot.run.profiles=test; exec bash" &

sleep 3

gnome-terminal -- bash -c "cd frontend && echo 'Iniciando Frontend...' && npm start; exec bash" &

echo -e "\033[32m✅ Serviços iniciados com H2!\033[0m"
echo -e "\033[36m🔗 Backend (H2): http://localhost:8080/api/v1\033[0m"
echo -e "\033[36m🎨 Frontend: http://localhost:3000\033[0m"
echo -e "\033[36m🗃️  H2 Console: http://localhost:8080/api/v1/h2-console\033[0m"
echo -e "\033[36m   📋 JDBC URL: jdbc:h2:mem:notryaCatalogodb\033[0m"
echo -e "\033[36m   👤 User: sa | Password: (vazio)\033[0m"