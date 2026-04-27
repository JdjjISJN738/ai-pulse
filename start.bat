@echo off
echo Starting PulseAI...
cd /d "%~dp0pulseai-health"
start "" http://localhost:3000
npm run dev
echo Done!
