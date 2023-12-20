import subprocess
import os
import platform

def restart_computer():
    print("Restarting computer...")
    if platform.system() == "Windows":
        ...
    elif platform.system() == "Linux":
        ...
    elif platform.system() == "Darwin":
        # os.system("shutdown /r /t 1") 
        ...
    else:
        print("Unknown operating system")
        return

def shutdown_computer():
    ...


if __name__ == "__main__":
    restart_computer()