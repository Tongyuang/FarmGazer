from LoRa import my_sx126x
import sys
import yaml
from sender import sx126x_sender



class receiver:
    def __init__(self):
        self.sender = sx126x_sender()
        self.node = self.sender.node
        
    def rot_receive(self):
        # rotative receive
        print("Start receiving... (Press ESC to quit)")
        while(True):
            # c = sys.stdin.read(1)
            # # continuous monitoring users' input key, if it's ESC, quit receiving
            # if c == '\x1b': 
            #     break
            res = self.node.receive()
            if res['status']:
                print(res)
                msg = res['message']
                print(msg)
                msg_crc = self.node.cal_crc(msg)
                print(msg,msg_crc)
                self.sender.send_bytes_message(str(msg_crc).encode())

if __name__ == "__main__":
    receiver = receiver()
    receiver.rot_receive()
