@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Instale Node.js 22 LTS antes de abrir a previa.
  pause
  exit /b 1
)
start "SpeakUp servidor local" cmd /k "node scripts\serve-preview.mjs"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173/"
