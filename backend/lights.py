import asyncio
from kasa import SmartBulb,Discover

class Light:

    bulb = None

    def __init__(self, ip):
        self.ip = ip
        self.bulb = SmartBulb(ip)

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
        


    class Device:
        lights = []

        def __init__(self):
            ...

        def scan(self):
            discovery = asyncio.run(Discover.discover())
            return discovery
    



if __name__ == "__main__":
    bulb = SmartBulb("10.0.0.167")
    asyncio.run(bulb.update())
    if bulb.is_on:
        asyncio.run(bulb.turn_off())
    else:
        asyncio.run(bulb.turn_on())