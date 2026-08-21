@echo off
echo ===================================================
echo   Starting StayEasy Spring Boot 3 Backend Server...
echo ===================================================
cd /d "%~dp0backend-java"
mvn spring-boot:run
pause
