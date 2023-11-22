from LoRa import sx126x
import sys
# currently this file is just for test, and it will be used for LoRa and Raspberry pi4B


class receiver:
    def __init__(self):
        self.node = sx126x.sx126x(serial_num = "/dev/ttyS0",freq=915,addr=1,power=22,rssi=True,air_speed=2400,relay=False)
        
    def receive(self):
        # rotative receive
        while(True):
            print("Start receiving... (Press ESC to quit)")
            c = sys.stdin.read(1)
            # continuous monitoring users' input key, if it's ESC, quit receiving
            if c == '\x1b': 
                break
            self.node.receive()

if __name__ == "__main__":
    receiver = receiver()
    receiver.receive()
