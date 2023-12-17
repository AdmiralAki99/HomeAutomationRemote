# # from requests import get
# # from scapy.all import ARP, Ether, srp
# # import socket

# # ##TODO: Need to find a better/smarter way to initialize the IP Address for the Network class

# # class NetworkScanner:

# #     ip = None
# #     scanned_devices = []

# #     def __init__(self) -> None:
# #         ip = get('https://api.ipify.org').content.decode('utf8')
# #         self.ip = ip

# #     def __init__(self, ip) -> None:
# #         self.ip = ip

# #     def scan(self) -> []:
# #         self.scanned_devices.clear()
# #         arp = ARP(pdst=self.ip)
# #         ether = Ether(dst="ff:ff:ff:ff:ff:ff")
# #         packet = ether/arp
# #         result = srp(packet, timeout=5, verbose=0)[0]
# #         clients = []
# #         for sent, received in result:
# #             clients.append({'ip': received.psrc, 'mac': received.hwsrc})
# #         self.scanned_devices = clients

# #     def get_scanned_devices(self) -> []:
# #         return self.scanned_devices
    
# #     def print_scanned_devices(self) -> None:
# #         """
# #         Prints the scanned devices in the network (Debug Only)
# #         """
# #         print("Available devices in the network:")
# #         print("IP" + " "*18+"MAC")
# #         for client in self.scanned_devices:
# #             # print(socket.gethostbyaddr(client['ip'])[0])
# #             print("{:16}    {}".format(client['ip'], client['mac']))

# # if __name__ == '__main__':
# #     # network = NetworkScanner(ip='192.168.29.1/24')
# #     # network.scan()
# #     # network.print_scanned_devices()
    
# # # Path: backend/scanner.py

# import socket
# import struct
# import os
# import platform

# def ping_scan(network_prefix):
#     reachable_devices = []

#     # Set the timeout for the socket
#     timeout = 3
#     icmp = socket.getprotobyname('icmp')
#     sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, icmp)

#     # Adjust the socket options based on the platform
#     if platform.system().lower() == 'windows':
#         sock.setsockopt(socket.SOL_IP, socket.IP_TTL, struct.pack('I', 128))
#     else:
#         sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVTIMEO, struct.pack('ll', timeout, 0))

#     # Perform the ping scan for each IP address in the network
#     for i in range(1, 256):  # Scanning IP addresses from 192.168.1.1 to 192.168.1.254
#         ip_address = f"{network_prefix}.{i}"
#         command = f"ping -c 1 {ip_address}" if platform.system().lower() == 'darwin' else f"ping -n 1 {ip_address}"
#         response = os.system(command)

#         if response == 0:
#             reachable_devices.append(ip_address)

#     return reachable_devices

# # Replace '192.168.1' with your network's prefix (e.g., '192.168.0' or '192.168.29')
# network_to_scan = '192.168.29'
# devices_on_network = ping_scan(network_to_scan)

# print("Devices reachable on the network:")
# print(devices_on_network)

import scapy.all as scapy
import socket

def get_hostname(ip):
    try:
        hostname = socket.gethostbyaddr(ip)[0]
        return hostname
    except socket.herror:
        return "Unknown"  # Return "Unknown" if the hostname cannot be resolved

def scan(ip):
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request

    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]

    devices_list = []
    for element in answered_list:
        device_dict = {
            "ip": element[1].psrc,
            "mac": element[1].hwsrc,
            "hostname": get_hostname(element[1].psrc)  # Get hostname using reverse DNS lookup
        }
        devices_list.append(device_dict)
    
    return devices_list

# Specify the target IP range to scan (e.g., '192.168.1.1/24')
target_ip_range = "192.168.29.1/24"  
scan_result = scan(target_ip_range)

# Display the list of detected devices with hostnames
print("List of devices connected to the network:")
print("----------------------------------------")
print("IP Address\t\tMAC Address\t\tHostname")
print("----------------------------------------")
for device in scan_result:
    print(f"{device['ip']}\t\t{device['mac']}\t{device['hostname']}")
