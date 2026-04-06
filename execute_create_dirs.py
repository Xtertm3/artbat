import os
import subprocess
import sys

# Change to the project directory
os.chdir(r"c:\Users\ANKIT TIWARI\Desktop\artbat")

# Execute the Node.js script
try:
    result = subprocess.run([sys.executable, "create_dirs.py"], capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    if result.returncode != 0:
        print(f"Script exited with code {result.returncode}")
except Exception as e:
    print(f"Error executing script: {e}")
