# start.ps1 - Script simplificado para MySQL

Write-Host "Iniciando Catalogo de Produtos..." -ForegroundColor Green

# Verificar estrutura
if (!(Test-Path "backend") -or !(Test-Path "frontend")) {
    Write-Host "ERRO: Execute na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Verificar MySQL
Write-Host "Verificando MySQL..." -ForegroundColor Blue
try {
    mysql -h localhost -u xunimadmin -pxunim@0787 -e "SELECT 1;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK - MySQL conectado!" -ForegroundColor Green
    } else {
        Write-Host "ERRO - MySQL nao conectou!" -ForegroundColor Red
        Write-Host "Verifique:" -ForegroundColor Yellow
        Write-Host "  1. MySQL esta rodando?" -ForegroundColor Yellow
        Write-Host "  2. Usuario: xunimadmin | Senha: xunim@0787" -ForegroundColor Yellow
        Write-Host "  3. Porta 3306 disponivel?" -ForegroundColor Yellow
        Read-Host "Pressione ENTER para continuar mesmo assim"
    }
} catch {
    Write-Host "AVISO - Cliente MySQL nao encontrado" -ForegroundColor Yellow
}

# Verificar Node.js
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "OK - Node.js encontrado" -ForegroundColor Green
    if (!(Test-Path "frontend/node_modules")) {
        Write-Host "Instalando dependencias..." -ForegroundColor Blue
        cd frontend
        npm install
        cd ..
    }
} else {
    Write-Host "AVISO - Node.js nao encontrado" -ForegroundColor Yellow
}

# Iniciar Backend
Write-Host "Iniciando Backend (MySQL)..." -ForegroundColor Blue
$backendCmd = "cd backend; Write-Host 'Backend MySQL iniciado!' -ForegroundColor Green; ./mvnw.cmd spring-boot:run; Read-Host 'Pressione ENTER para fechar'"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd

# Aguardar
Start-Sleep 8

# Iniciar Frontend
if (Test-Path "frontend/package.json") {
    Write-Host "Iniciando Frontend..." -ForegroundColor Blue
    $frontendCmd = "cd frontend; Write-Host 'Frontend iniciado!' -ForegroundColor Green; npm start; Read-Host 'Pressione ENTER para fechar'"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd
}

Write-Host ""
Write-Host "APLICACAO INICIADA!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8080/api/v1" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "MySQL:    Use phpMyAdmin ou MySQL Workbench" -ForegroundColor Cyan