import os
from adb_shell.adb_device import AdbDeviceTcp
from adb_shell.auth.sign_pythonrsa import PythonRSASigner
from adb_shell.auth.keygen import keygen
from enum import Enum

class KeyStroke(Enum):
    BACK = 4
    MENU = 82
    DPAD_CENTER = 23
    DPAD_DOWN = 20
    DPAD_LEFT = 21
    DPAD_RIGHT = 22
    DPAD_UP = 19
    PLAY_PAUSE = 85
    REWIND = 89
    FAST_FORWARD = 90
    VOLUME_DOWN = 25
    VOLUME_UP = 24
    MICROPHONE_BUTTON = 130
    POWER = 26
    HOME = 3
    

class RemoteController:
    def __init__(self):
        self.__create_credentials()
    
    def __create_credentials(self):
        # Generate a new private key
        private_key, public_key = self.__get_adb_key()
        
        # Connect to the device
        self.credentials = PythonRSASigner(public_key, private_key)
        
    def add_device(self,device_ip) -> AdbDeviceTcp:
        self.device = AdbDeviceTcp(device_ip, 5555, default_transport_timeout_s=9)
        try:
            self.device.connect(rsa_keys=[self.credentials],auth_timeout_s=10)
        except Exception as e:
            print(f'Error connecting to device: {e}')
        
        return self.device

    def __get_adb_key(self):
        if not self.__check_key_exists():
            print("Generating new key")
            keygen('adbkey')

        # Read the private key
        with open('adbkey', 'r') as f:
            private_key = f.read()
        
        with open('adbkey'+'.pub', 'r') as f:
            public_key = f.read()
            
        return private_key, public_key
        
             
    def __check_key_exists(self):
        return os.path.isfile('adbkey')
    
    def trigger_key(self,key: str):
        match key:
            case "back":
                self.__send_key(KeyStroke.BACK)
            case "menu":
                self.__send_key(KeyStroke.MENU)
            case "dpad_center":
                self.__send_key(KeyStroke.DPAD_CENTER)
            case "dpad_down":
                self.__send_key(KeyStroke.DPAD_DOWN)
            case "dpad_left":
                self.__send_key(KeyStroke.DPAD_LEFT)
            case "dpad_right":
                self.__send_key(KeyStroke.DPAD_RIGHT)
            case "dpad_up":
                self.__send_key(KeyStroke.DPAD_UP)
            case "play_pause":
                self.__send_key(KeyStroke.PLAY_PAUSE)
            case "rewind":
                self.__send_key(KeyStroke.REWIND)
            case "fast_forward":
                self.__send_key(KeyStroke.FAST_FORWARD)
            case "volume_down":
                self.__send_key(KeyStroke.VOLUME_DOWN)
            case "volume_up":
                self.__send_key(KeyStroke.VOLUME_UP)
            case "microphone_button":
                self.__send_key(KeyStroke.MICROPHONE_BUTTON)
            case "power":
                self.__send_key(KeyStroke.POWER)
            case "home":
                self.__send_key(KeyStroke.HOME)
            case _:
                print("Unknown key")
                
    
    def __send_key(self,key: KeyStroke):
        command = f'input keyevent {key.value}'.encode('utf-8')
        self.device._service(b'shell', command)
    
    
    
if __name__ == "__main__":
    rc = RemoteController()
    rc.add_device("10.0.0.32")
    print("Sending key")
    # rc.send_key(KeyStroke.MENU)
    # rc.send_key(KeyStroke.DPAD_DOWN)
    # rc.send_key(KeyStroke.DPAD_DOWN)
    # rc.send_key(KeyStroke.DPAD_DOWN)