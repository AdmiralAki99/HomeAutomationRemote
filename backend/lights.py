import asyncio
from kasa import SmartBulb,Discover,Credentials
from dotenv import load_dotenv
import os

class Light:

    bulb = None
    ip = None
    state = None
    color = None
    brightness = None
    name = None

    def __init__(self, ip):
        self.ip = ip
        asyncio.run(self.__init_bulb__())

    async def __init_bulb__(self):
        self.bulb = SmartBulb(self.ip)
        await self.bulb.update()
        self.brightness = self.bulb.brightness
        self.name = self.bulb.alias

    def get_state(self):
        if self.bulb is None:
            return None

        if self.bulb.is_on:
            return "on"
        else:
            return "off"
        
    def get_alias(self):
        if self.bulb is None:
            return None

        return self.bulb.alias
    
    def get_ip(self):
        return self.ip
    
    async def turn_on(self):
        await self.bulb.turn_on()
        
    async def turn_off(self):
        await self.bulb.turn_off()
        await self.bulb.update()

        
    def get_brightness(self):
        return self.brightness
    
    async def set_brightness(self, brightness):
        if self.bulb is None:
            return None

        await self.bulb.set_brightness(brightness)
        await self.bulb.update()
        self.brightness = brightness
        
    def get_alias(self):
        if self.bulb is None:
            return None

        return self.name
    
    async def set_alias(self, name):
        if self.bulb is None:
            return None

        await self.bulb.set_alias(name)
        await self.bulb.update()
        
        self.name = name

    def get_json_data(self):
        return {"ip": self.ip, "name": self.name, "state": self.get_state()}

"""
{'10.0.0.167': <DeviceType.Bulb model KL125(US) at 10.0.0.167 (Desk Lamp), is_on: True - dev specific: {'Brightness': 9, 'Is dimmable': True, 'Color temperature': 4150, 'Valid temperature range': ColorTempRange(min=2500, max=6500), 'HSV': HSV(hue=0, saturation=0, value=9), 'Presets': [SmartBulbPreset(index=0, brightness=50, hue=0, saturation=0, color_temp=2700, custom=None, id=None, mode=None), SmartBulbPreset(index=1, brightness=100, hue=0, saturation=100, color_temp=0, custom=None, id=None, mode=None), SmartBulbPreset(index=2, brightness=100, hue=120, saturation=100, color_temp=0, custom=None, id=None, mode=None), SmartBulbPreset(index=3, brightness=100, hue=240, saturation=100, color_temp=0, custom=None, id=None, mode=None)]}>}
"""

async def discover_devices():
    load_dotenv()
    devices = await Discover.discover(
        credentials= Credentials(f'{os.getenv("KASA_USERNAME")}', f'{os.getenv("KASA_PASSWORD")}'),
        timeout=20,
    )

    lights= []
    
    for ip,device in devices.items():
        await device.update()
        lights.append({"ip": ip, "name": device.alias, "state": device.is_on})

    return lights

    

if __name__ == "__main__":

    # bulb = SmartBulb("10.0.0.167")
    # asyncio.run(bulb.update())
    # if bulb.is_on:
    #     asyncio.run(bulb.turn_off())
    # else:
    #     asyncio.run(bulb.turn_on())

    bulb = Light("10.0.0.167")
    print(bulb.get_json_data())
    print(asyncio.run(bulb.turn_off()))