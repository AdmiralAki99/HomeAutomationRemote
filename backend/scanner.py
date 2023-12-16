from requests import get
from scapy.all import ARP, Ether, srp

class Network:
    ip = None
    scanned_devices = []

    def __init__(self) -> None:
        ip = get('https://api.ipify.org').content.decode('utf8')
        self.ip = ip

    def __init__(self, ip) -> None:
        self.ip = ip

    def scan(self) -> []:
        arp = ARP(pdst=self.ip)
        ether = Ether(dst="ff:ff:ff:ff:ff:ff")
        packet = ether/arp
        result = srp(packet, timeout=5, verbose=0)[0]
        clients = []
        for sent, received in result:
            clients.append({'ip': received.psrc, 'mac': received.hwsrc})
        self.scanned_devices = clients

    def get_scanned_devices(self) -> []:
        return self.scanned_devices
    
    def print_scanned_devices(self) -> None:
        print("Available devices in the network:")
        print("IP" + " "*18+"MAC")
        for client in self.scanned_devices:
            print("{:16}    {}".format(client['ip'], client['mac']))

if __name__ == '__main__':
    network = Network(ip='192.168.29.1/24')
    network.scan()
    network.print_scanned_devices()
# Path: backend/scanner.py