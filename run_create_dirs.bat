@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\ANKIT TIWARI\Desktop\artbat"

echo Creating directory structure for React LSSM frontend project...

REM Create directories
mkdir src\styles 2>nul
mkdir src\assets\images 2>nul
mkdir src\assets\icons 2>nul
mkdir src\components\common 2>nul
mkdir src\components\layout 2>nul
mkdir src\components\auth 2>nul
mkdir src\components\course 2>nul
mkdir src\components\student 2>nul
mkdir src\components\instructor 2>nul
mkdir src\components\admin 2>nul
mkdir src\components\payment 2>nul
mkdir src\components\notifications 2>nul
mkdir src\pages\public 2>nul
mkdir src\pages\auth 2>nul
mkdir src\pages\student 2>nul
mkdir src\pages\instructor 2>nul
mkdir src\pages\admin 2>nul
mkdir src\pages\payment 2>nul
mkdir src\pages\errors 2>nul
mkdir src\hooks 2>nul
mkdir src\store 2>nul
mkdir src\services 2>nul
mkdir src\lib 2>nul
mkdir src\types 2>nul
mkdir src\config 2>nul
mkdir public 2>nul

echo.
echo Directory structure created successfully!
echo All directories have been created.

exit /b 0
