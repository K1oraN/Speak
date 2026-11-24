@echo off
cd /d "%~dp0"
where npm >nul 2>&1
if errorlevel 1 (
  echo Instale Node.js 22 LTS e execute novamente.
  pause
  exit /b 1
)
if exist package-lock.json (
  call npm ci
) else (
  call npm install
)
if errorlevel 1 (
  echo Instalacao falhou. Verifique a conexao com o npm.
  pause
  exit /b 1
)
echo Instalacao concluida. Execute INICIAR.bat.
pause
