@echo off
REM Create LSSM Frontend Project Directory Structure
REM Location: c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src

cd /d "c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src"

echo Creating directory structure for LSSM frontend project...
echo.

echo Creating styles directory...
mkdir styles 2>nul

echo Creating assets directories...
mkdir assets\images 2>nul
mkdir assets\icons 2>nul

echo Creating components directories...
mkdir components\common 2>nul
mkdir components\layout 2>nul
mkdir components\auth 2>nul
mkdir components\course 2>nul
mkdir components\student 2>nul
mkdir components\instructor 2>nul
mkdir components\admin 2>nul
mkdir components\payment 2>nul
mkdir components\notifications 2>nul

echo Creating pages directories...
mkdir pages\public 2>nul
mkdir pages\auth 2>nul
mkdir pages\student 2>nul
mkdir pages\instructor 2>nul
mkdir pages\admin 2>nul
mkdir pages\payment 2>nul
mkdir pages\errors 2>nul

echo Creating hooks directory...
mkdir hooks 2>nul

echo Creating store directory...
mkdir store 2>nul

echo Creating services directory...
mkdir services 2>nul

echo Creating lib directory...
mkdir lib 2>nul

echo Creating types directory...
mkdir types 2>nul

echo Creating config directory...
mkdir config 2>nul

echo.
echo ========================================
echo Directory structure created successfully!
echo ========================================
echo.
echo Created directories in:
echo   c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src
echo.
echo Directory listing:
tree /F

echo.
pause
