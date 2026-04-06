import os

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
    "assets/images",
    "assets/icons",
]

for d in dirs:
    path = os.path.join(base, d)
    os.makedirs(path, exist_ok=True)
    print(f"Created: {path}")

# Also create public directory at project root
public_path = r"c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\public"
os.makedirs(public_path, exist_ok=True)
print(f"Created: {public_path}")

print("\nDirectory structure created successfully!")
