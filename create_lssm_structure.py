import os

base = r"c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src"

dirs = [
    "styles",
    "assets/images",
    "assets/icons",
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
    "hooks",
    "store",
    "services",
    "lib",
    "types",
    "config",
]

created_dirs = []
for d in dirs:
    path = os.path.join(base, d)
    os.makedirs(path, exist_ok=True)
    created_dirs.append(path)
    print(f"Created: {path}")

print(f"\nDone! Created {len(created_dirs)} directories.")
print("\nDirectory Structure:")
for d in created_dirs:
    print(f"  {d}")
