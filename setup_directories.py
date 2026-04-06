import os

base = r"c:\Users\ANKIT TIWARI\Desktop\artbat"

dirs = [
    "src/styles",
    "src/assets/images",
    "src/assets/icons",
    "src/components/common",
    "src/components/layout",
    "src/components/auth",
    "src/components/course",
    "src/components/student",
    "src/components/instructor",
    "src/components/admin",
    "src/components/payment",
    "src/components/notifications",
    "src/pages/public",
    "src/pages/auth",
    "src/pages/student",
    "src/pages/instructor",
    "src/pages/admin",
    "src/pages/payment",
    "src/pages/errors",
    "src/hooks",
    "src/store",
    "src/services",
    "src/lib",
    "src/types",
    "src/config",
    "public"
]

for d in dirs:
    path = os.path.join(base, d)
    os.makedirs(path, exist_ok=True)
    print(f"Created: {path}")

print("\nDirectory structure created successfully!")
print(f"All directories have been created at: {base}")
