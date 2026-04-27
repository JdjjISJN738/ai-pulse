@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   PulseAI Health Monitoring Platform (Vite)
echo ========================================
echo.

REM Check if the project directory exists
if not exist "pulseai-health" (
    echo [ERROR] pulseai-health directory not found.
    pause
    exit /b
)

cd pulseai-health

REM Check for node_modules
if not exist "node_modules" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b
    )
)

REM Cleanup any existing process on port 3000
echo [INFO] Checking for existing processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo [INFO] Killing process %%a on port 3000...
    taskkill /F /PID %%a >nul 2>&1
)

REM Start the development server and open browser
echo [INFO] Starting development server (Vite)...
echo [INFO] The application will be available at: http://localhost:3000
echo.

REM Start browser after a short delay
start "" http://localhost:3000

REM Run the dev server
call npm run dev

if !errorlevel! neq 0 (
    echo.
    echo [ERROR] Dev server crashed or failed to start.
    pause
)

echo.
echo Server stopped.
pause
