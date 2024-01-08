from LoRa import sx126x
import time
import sys
import yaml

class sx126x_sender:
    def __init__(self):
        # load default settings
        with open('./config.yml','r') as rf:
            settings = yaml.safe_load(rf)
        #node = sx126x.sx126x(serial_num = "/dev/ttyS0",freq=868,addr=0,power=22,rssi=True,air_speed=2400,relay=False)
        set_sx126x = settings['sx126x']
        self.node = sx126x.sx126x(
            serial_num = set_sx126x['serial_num'],
            freq = set_sx126x['freq'],
            addr = set_sx126x['sender_addr'],
            power = set_sx126x['power'],
            rssi = set_sx126x['rssi'],
            air_speed = set_sx126x['air_speed'],
            relay = set_sx126x['relay']
            )
        self.sender_freq = set_sx126x['freq']
    
    def get_data_bytes(self,data_in,receiver_addr=0,sender_addr=0):
        #         receiving node              receiving node                   receiving node           own high 8bit           own low 8bit                 own 
        #         high 8bit address           low 8bit address                    frequency                address                 address                  frequency             message payload
        
        # check message length first
        data_in_bytes = data_in.encode()
        #print(len(data_in_bytes))
        # if len(data_in_bytes xxx)
        offset_freq = int(self.sender_freq)-(850 if int(self.sender_freq)>850 else 410)
        
        # high 8-bit addr + low 8-bit addr + freq
        receiver_info_bytes = bytes([receiver_addr>>8]) + bytes([receiver_addr&0xff]) + bytes([offset_freq])
        
        # high 8-bit addr + low 8-bit addr + freq
        sender_info_bytes = bytes([sender_addr>>8]) + bytes([sender_addr&0xff]) + bytes([offset_freq])        

        # concatenate
        return receiver_info_bytes + sender_info_bytes + data_in_bytes
    
    def test_send(self,message="Hello"):
        receiver_node_addr = 0
        receiver_node_freq = self.sender_freq
    
        #message = "Hello"
        #         receiving node              receiving node                   receiving node           own high 8bit           own low 8bit                 own 
        #         high 8bit address           low 8bit address                    frequency                address                 address                  frequency             message payload
        data = self.get_data_bytes(data_in=message)
        self.node.send(data)
    

if __name__ == "__main__":
    sender = sx126x_sender()
    while True:
        data_in = input(str)
        if data_in == "c":
            break
        sender.test_send(data_in)