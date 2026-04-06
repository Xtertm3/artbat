@echo off
cd /d "c:\Users\ANKIT TIWARI\Desktop\artbat"

echo Creating LSSM Frontend Project Directory Structure...
echo.

python create_lssm_structure.py

if errorlevel 1 (
    echo.
    echo Python failed. Trying python3...
    python3 create_lssm_structure.py
)

echo.
echo Directory structure creation complete!
pause
