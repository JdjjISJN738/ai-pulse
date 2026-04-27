@echo off
echo Starting PulseAI Health Monitoring Platform (Vite)...
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found. Please run this from the project root directory.
    pause
    exit /b
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b
    )
)

REM Start the development server
echo.
echo ========================================
echo   PulseAI Health Platform (Vite)
echo ========================================
echo.
echo [INFO] Starting development server...
echo.
echo The application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start the development server.
    pause
)

echo.
echo Server stopped.
pause
