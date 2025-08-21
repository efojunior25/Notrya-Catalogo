# dev-mysql.ps1 - Script para MySQL (VERSAO LIMPA - SEM EMOJIS)

Write-Host "Iniciando aplicacao com MySQL..." -ForegroundColor Green

# Verificar estrutura do projeto
if (!(Test-Path "backend") -or !(Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script na raiz do projeto!" -ForegroundColor Red
    Write-Host "Estrutura esperada:" -ForegroundColor Yellow
    Write-Host "   projeto-root/"
    Write-Host "   |-- backend/"
    Write-Host "   |-- frontend/"
    Write-Host "   |-- scripts/"
    Read-Host "Pressione ENTER para sair"
    exit 1
}

# Verificar Java
Write-Host "Verificando Java..." -ForegroundColor Blue
try {
    $javaOutput = java -version 2>&1
    Write-Host "OK - Java encontrado" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: Java nao esta instalado!" -ForegroundColor Red
    Write-Host "Instale o Java 17+ antes de continuar." -ForegroundColor Cyan
    Read-Host "Pressione ENTER para sair"
    exit 1
}

# Verificar Maven wrapper
if (!(Test-Path "backend/mvnw.cmd")) {
    Write-Host "ERRO: Maven wrapper nao encontrado!" -ForegroundColor Red
    Write-Host "Execute no diretorio backend:" -ForegroundColor Cyan
    Write-Host "mvn -N io.takari:maven:wrapper" -ForegroundColor Cyan
    Read-Host "Pressione ENTER para sair"
    exit 1
}

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Blue
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "OK - Node.js encontrado: $nodeVersion" -ForegroundColor Green

        # Verificar dependencias do frontend
        if (!(Test-Path "frontend/node_modules")) {
            Write-Host "Instalando dependencias do frontend..." -ForegroundColor Blue
            Push-Location frontend
            npm install
            Pop-Location
        }
    }
}
catch {
    Write-Host "AVISO: Node.js nao encontrado - frontend nao sera iniciado" -ForegroundColor Yellow
}

# Verificar MySQL (opcional)
Write-Host "Verificando MySQL..." -ForegroundColor Blue
try {
    mysql -h localhost -u xunimadmin -pxunim@0787 -e "SELECT 1;" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK - MySQL conectado com sucesso!" -ForegroundColor Green
    }
    else {
        Write-Host "AVISO: MySQL nao conectou - verifique se esta rodando" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "AVISO: Cliente MySQL nao encontrado - ignorando verificacao" -ForegroundColor Yellow
}

function Start-Backend-MySQL {
    Write-Host "Iniciando Backend com MySQL..." -ForegroundColor Blue
    Write-Host "Diretorio: $PWD\backend" -ForegroundColor Cyan
    Write-Host "Isso pode levar alguns minutos na primeira execucao..." -ForegroundColor Cyan

    $backendCommand = "Set-Location backend; Write-Host 'Backend iniciando com MySQL...' -ForegroundColor Green; Write-Host 'Diretorio atual:' (Get-Location); Write-Host 'Executando: ./mvnw.cmd spring-boot:run' -ForegroundColor Cyan; ./mvnw.cmd spring-boot:run; Write-Host 'Backend encerrado - pressione ENTER para fechar' -ForegroundColor Red; Read-Host"

    Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCommand
}

function Start-Frontend {
    if ((Test-Path "frontend/package.json") -and (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "Iniciando Frontend..." -ForegroundColor Blue

        $frontendCommand = "Set-Location frontend; Write-Host 'Frontend iniciando...' -ForegroundColor Green; Write-Host 'Diretorio atual:' (Get-Location); Write-Host 'Executando: npm start' -ForegroundColor Cyan; npm start; Write-Host 'Frontend encerrado - pressione ENTER para fechar' -ForegroundColor Red; Read-Host"

        Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand
    }
    else {
        Write-Host "AVISO: Frontend nao disponivel" -ForegroundColor Yellow
    }
}

# Iniciar servicos
Start-Backend-MySQL
Start-Sleep -Seconds 5
Start-Frontend

Write-Host ""
Write-Host "Servicos iniciados!" -ForegroundColor Green
Write-Host "Backend (MySQL): http://localhost:8080/api/v1" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Gerencie MySQL com PhpMyAdmin ou MySQL Workbench" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para parar os servicos, feche as janelas do PowerShell" -ForegroundColor Yellow