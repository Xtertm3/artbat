#!/usr/bin/env python3
"""
Alternative directory creation script - creates directories directly
"""
import os
import sys

base = r"c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src"

dirs = [
    "types", "config", "lib", "hooks", "store", "services",
    "styles",
    "components/common",
    "components/layout",
    "components/auth",
    "components/course",
    "components/student",
    "components/instructor",
    "components/admin",
    "components/payment",
    "components/notifications",
    "pages/public",
    "pages/auth",
    "pages/student",
    "pages/instructor",
    "pages/admin",
    "pages/payment",
    "pages/errors",
]

print(f"Creating directories under: {base}")
print("-" * 60)

try:
    for d in dirs:
        path = os.path.join(base, d)
        os.makedirs(path, exist_ok=True)
        print(f"✓ Created: {d}")
    
    print("-" * 60)
    print("✓ ALL DIRECTORIES CREATED SUCCESSFULLY!")
    sys.exit(0)
    
except Exception as e:
    print(f"✗ ERROR: {e}", file=sys.stderr)
    sys.exit(1)
