import scapy.all as scapy

def scan(ip):
    # Create an ARP request packet
    arp_request = scapy.ARP(pdst=ip)
    
    # Create an Ethernet frame
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    
    # Combine the Ethernet frame and ARP request packet
    arp_request_broadcast = broadcast/arp_request
    
    # Send the packet and receive the response
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    # List to store the detected devices
    devices_list = []
    
    for element in answered_list:
        device_dict = {"ip": element[1].psrc, "mac": element[1].hwsrc}
        devices_list.append(device_dict)
    
    return devices_list

# Function call with the target IP range
target_ip_range = "192.168.1.0/24"  # Change this to your network's IP range
scan_result = scan(target_ip_range)

# Display the list of detected devices
print("List of devices connected to the network:")
print("----------------------------------------")
print("IP Address\t\tMAC Address")
print("----------------------------------------")
for device in scan_result:
    print(f"{device['ip']}\t\t{device['mac']}")
