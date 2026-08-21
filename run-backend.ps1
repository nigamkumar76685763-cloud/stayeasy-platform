Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Starting StayEasy Spring Boot 3 Backend Server..." -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend-java"
mvn spring-boot:run
