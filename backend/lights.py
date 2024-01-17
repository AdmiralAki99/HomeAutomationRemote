import asyncio
from kasa import SmartBulb,Discover

class Light:

    bulb = None
    ip = None
    state = None
    color = None
    brightness = None
    name = None

    def __init__(self, ip):
        self.ip = ip
        self.bulb = SmartBulb(ip)
        asyncio.run(self.bulb.update())
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
    
    def turn_on(self):
        if self.bulb is None:
            return None

        asyncio.run(self.bulb.turn_on())
        if self.bulb.is_on:
            return True
        else:
            return False
        
    def turn_off(self):
        if self.bulb is None:
            return None

        asyncio.run(self.bulb.turn_off())
        if self.bulb.is_off:
            return True
        else:
            return False
        
    def get_brightness(self):
        return self.brightness
    
    def set_brightness(self, brightness):
        if self.bulb is None:
            return None

        asyncio.run(self.bulb.set_brightness(brightness))
        self.brightness = brightness
        
    def get_alias(self):
        if self.bulb is None:
            return None

        return self.name
    
    def set_alias(self, name):
        if self.bulb is None:
            return None

        asyncio.run(self.bulb.set_alias(name))
        self.name = name

    def get_json_data(self):
        return {"ip": self.ip, "name": self.name, "state": self.get_state()}


    class Device:
        lights = []

        def __init__(self):
            ...

        def scan(self):
            discovery = asyncio.run(Discover.discover())
            return discovery
        
        def add_light(self, ip,name):
            self.lights.append(Light(ip))

        def get_lights(self):
            return {"lights": self.lights}
        

"""
{'10.0.0.167': <DeviceType.Bulb model KL125(US) at 10.0.0.167 (Desk Lamp), is_on: True - dev specific: {'Brightness': 9, 'Is dimmable': True, 'Color temperature': 4150, 'Valid temperature range': ColorTempRange(min=2500, max=6500), 'HSV': HSV(hue=0, saturation=0, value=9), 'Presets': [SmartBulbPreset(index=0, brightness=50, hue=0, saturation=0, color_temp=2700, custom=None, id=None, mode=None), SmartBulbPreset(index=1, brightness=100, hue=0, saturation=100, color_temp=0, custom=None, id=None, mode=None), SmartBulbPreset(index=2, brightness=100, hue=120, saturation=100, color_temp=0, custom=None, id=None, mode=None), SmartBulbPreset(index=3, brightness=100, hue=240, saturation=100, color_temp=0, custom=None, id=None, mode=None)]}>}
"""



if __name__ == "__main__":
    bulb = SmartBulb("10.0.0.167")
    asyncio.run(bulb.update())
    if bulb.is_on:
        asyncio.run(bulb.turn_off())
    else:
        asyncio.run(bulb.turn_on())