from LoRa import sx126x
import time
import sys

class sender:
    def __init__(self):
        self.node = sx126x.sx126x(serial_num = "/dev/ttyS0",freq=915,addr=0,power=22,rssi=True,air_speed=2400,relay=False)
    
    def test_send(self):
        receiver_node_addr = 1
        receiver_node_freq = 915
        sender_node_addr = 0
        sender_node_freq = 915
        message = "Hello World"
        #         receiving node              receiving node                   receiving node           own high 8bit           own low 8bit                 own 
        #         high 8bit address           low 8bit address                    frequency                address                 address                  frequency             message payload
        data = bytes([receiver_node_addr>>8]) + bytes([receiver_node_addr&0xff]) + bytes([receiver_node_freq]) + bytes([sender_node_addr>>8]) + bytes([sender_node_addr&0xff]) + bytes([sender_node_freq]) + message.encode()
        while(True):
            # continuous monitoring users' input key, if it's ESC, quit sending
            print("Start sending... (Press ESC to quit)")
            c = sys.stdin.read(1)
            if c == '\x1b': 
                break
            self.node.send(data)
            time.sleep(1)