# LSSM Frontend Project Structure Setup

## Overview
This package contains scripts to create the complete directory structure for the LSSM (London Serenade School of Music) Frontend project.

## Location
Base directory: `c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src`

## Files Created

### 1. create_lssm_structure.py
A Python script that creates all necessary directories for the LSSM frontend project.

**How to run:**
```bash
cd c:\Users\ANKIT TIWARI\Desktop\artbat
python create_lssm_structure.py
```

Or with python3:
```bash
python3 create_lssm_structure.py
```

### 2. setup_lssm_structure.bat
A batch file that creates all directories using native Windows commands.

**How to run:**
- Double-click `setup_lssm_structure.bat`
- Or run from command prompt:
```bash
cd c:\Users\ANKIT TIWARI\Desktop\artbat
setup_lssm_structure.bat
```

### 3. run_create.bat
A batch file that runs the Python script and falls back to python3 if needed.

**How to run:**
- Double-click `run_create.bat`

## Directory Structure

The following directories will be created under `lssm-frontend/src/`:

```
src/
├── styles/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/
│   ├── layout/
│   ├── auth/
│   ├── course/
│   ├── student/
│   ├── instructor/
│   ├── admin/
│   ├── payment/
│   └── notifications/
├── pages/
│   ├── public/
│   ├── auth/
│   ├── student/
│   ├── instructor/
│   ├── admin/
│   ├── payment/
│   └── errors/
├── hooks/
├── store/
├── services/
├── lib/
├── types/
└── config/
```

## Total Directories
**25 directories** will be created (not including the parent `src/` directory which already exists).

## Recommended Approach

1. **If you have Python installed:** Use `python create_lssm_structure.py` for better output and validation.
2. **If Python is not installed:** Use `setup_lssm_structure.bat` - it uses native Windows commands.
3. **If unsure:** Use `run_create.bat` - it tries Python first, then falls back to batch.

## Verification

After running any of the scripts, verify the structure was created by running:
```bash
cd c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src
tree /F
```

Or navigate to the directory in File Explorer to confirm all folders are present.

## What Each Directory Is For

- **styles/**: Global CSS/SCSS stylesheets and theme files
- **assets/images/**: Image assets (PNG, JPG, SVG, etc.)
- **assets/icons/**: Icon assets and icon sets
- **components/common/**: Reusable UI components (buttons, cards, inputs, etc.)
- **components/layout/**: Layout components (header, footer, sidebar, etc.)
- **components/auth/**: Authentication-related components
- **components/course/**: Course-related components
- **components/student/**: Student dashboard components
- **components/instructor/**: Instructor dashboard components
- **components/admin/**: Admin panel components
- **components/payment/**: Payment and billing components
- **components/notifications/**: Notification components
- **pages/public/**: Public-facing pages
- **pages/auth/**: Authentication pages (login, register, etc.)
- **pages/student/**: Student pages
- **pages/instructor/**: Instructor pages
- **pages/admin/**: Admin pages
- **pages/payment/**: Payment-related pages
- **pages/errors/**: Error pages (404, 500, etc.)
- **hooks/**: Custom React hooks
- **store/**: State management (Redux, Zustand, etc.)
- **services/**: API services and external service integrations
- **lib/**: Utility functions and helper libraries
- **types/**: TypeScript type definitions
- **config/**: Configuration files

## Notes

- All scripts use `exist_ok=True` (Python) or redirect errors to nul (Batch), so running them multiple times is safe.
- The existing assets directory will be preserved if it exists.
- No files are deleted or overwritten by these scripts - only directories are created.
