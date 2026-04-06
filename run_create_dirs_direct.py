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
]

print("=== Creating React Project Directories ===\n")

for d in dirs:
    path = os.path.join(base, d)
    os.makedirs(path, exist_ok=True)
    print(f"✓ Created: {path}")

print("\n=== ALL DONE - Directory Creation Complete ===\n")

# List all directories created in src folder
print("=== Listing all directories in src folder ===\n")
src_path = base
contents = os.listdir(src_path)
contents.sort()

for item in contents:
    item_path = os.path.join(src_path, item)
    if os.path.isdir(item_path):
        print(f"📁 {item}/")
        # List subdirectories if they exist
        try:
            subdirs = os.listdir(item_path)
            for subitem in sorted(subdirs):
                subitem_path = os.path.join(item_path, subitem)
                if os.path.isdir(subitem_path):
                    print(f"   📁 {subitem}/")
        except:
            pass

print("\n=== Verification Complete ===")
