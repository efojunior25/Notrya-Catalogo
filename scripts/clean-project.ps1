# clean-project.ps1 - Limpar projeto e reconstruir

Write-Host "Limpando projeto..." -ForegroundColor Green

# Ir para backend
cd backend

Write-Host "1. Limpando Maven..." -ForegroundColor Blue
./mvnw.cmd clean

Write-Host "2. Compilando..." -ForegroundColor Blue
./mvnw.cmd compile

Write-Host "3. Testando conexao..." -ForegroundColor Blue
Write-Host "Iniciando aplicacao para teste..." -ForegroundColor Yellow
Write-Host "Pressione Ctrl+C para parar apos ver que funcionou" -ForegroundColor Yellow
./mvnw.cmd spring-boot:run

Write-Host "Limpeza concluida!" -ForegroundColor Green