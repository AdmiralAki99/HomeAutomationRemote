##TODO: Need to find a better/smarter way to initialize the IP Address for the Network class

from scapy.all import ARP, Ether, srp
import socket
import sys
import struct


class NetworkScanner:

    ip = None
    scanned_devices = []

    def __init__(self) -> None:
        # ip = get('https://api.ipify.org').content.decode('utf8')
        # self.ip = ip
        ...

    def scan(self,ip_addr) -> []:
        self.scanned_devices.clear()
        arp = ARP(pdst=ip_addr)
        ether = Ether(dst="ff:ff:ff:ff:ff:ff")
        packet = ether/arp

        result = srp(packet, timeout=5, verbose=0)[0]
        clients = []
        for sent, received in result:
            clients.append({'ip': received.psrc, 'mac': received.hwsrc,'hostname': self.__get_host_name(received.psrc)})
        self.scanned_devices = clients

    def get_scanned_devices(self) -> []:
        return self.scanned_devices
    
    def print_scanned_devices(self) -> None:
        """
        Prints the scanned devices in the network (Debug Only)
        """
        print("Available devices in the network:")
        print("IP" + " "*18+"MAC")
        for client in self.scanned_devices:
            # print(socket.gethostbyaddr(client['ip'])[0])
            print("{:16}    {}".format(client['ip'], client['mac']))
            print("{:16}    {}".format(client['ip'], client['hostname']))
    def __get_host_name(self,ip_address):
        try:
            hostname = socket.gethostbyaddr(ip_address)[0]
            return hostname
        except socket.herror:
            return "Unknown"  # Return "Unknown" if the hostname cannot be resolved
        
    def wake_device(self):
        ...

if __name__ == '__main__':
    network = NetworkScanner(ip='192.168.29.184')
    network.scan()
    network.print_scanned_devices()
