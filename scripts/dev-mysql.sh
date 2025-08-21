#!/bin/bash
# dev-mysql.sh - Script para rodar com MySQL

echo -e "\033[32m🚀 Iniciando aplicação com MySQL...\033[0m"

if [[ ! -d "backend" || ! -d "frontend" ]]; then
    echo -e "\033[31m❌ Execute este script na raiz do projeto!\033[0m"
    exit 1
fi

# Verificar se MySQL está rodando
if ! mysql -u xunimadmin -pxunim@0787 -e "SELECT 1;" > /dev/null 2>&1; then
    echo -e "\033[33m⚠️  MySQL não está rodando ou credenciais incorretas!\033[0m"
    echo -e "\033[36m💡 Certifique-se de que o MySQL está ativo e as credenciais estão corretas.\033[0m"
fi

start_backend_mysql() {
    echo -e "\033[34m🔧 Iniciando Backend com MySQL...\033[0m"
    (cd backend && ./mvnw spring-boot:run -Dspring-boot.run.profiles=default)
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
gnome-terminal -- bash -c "cd backend && echo 'Iniciando com MySQL...' && ./mvnw spring-boot:run; exec bash" &

sleep 3

gnome-terminal -- bash -c "cd frontend && echo 'Iniciando Frontend...' && npm start; exec bash" &

echo -e "\033[32m✅ Serviços iniciados!\033[0m"
echo -e "\033[36m🔗 Backend (MySQL): http://localhost:8080/api/v1\033[0m"
echo -e "\033[36m🎨 Frontend: http://localhost:3000\033[0m"
echo -e "\033[36m📊 PhpMyAdmin/MySQL Workbench para gerenciar MySQL\033[0m"

---
