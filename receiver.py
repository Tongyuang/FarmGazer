from LoRa import my_sx126x
import sys
import yaml
# currently this file is just for test, and it will be used for LoRa and Raspberry pi4B


class receiver:
    def __init__(self):
        # load default settings
        with open('./config.yml','r') as rf:
            settings = yaml.safe_load(rf)
        #node = sx126x.sx126x(serial_num = "/dev/ttyS0",freq=868,addr=0,power=22,rssi=True,air_speed=2400,relay=False)
        set_sx126x = settings['sx126x']
        self.node = my_sx126x.Mysx126x(
            serial_num = set_sx126x['serial_num'],
            freq = set_sx126x['freq'],
            addr = set_sx126x['sender_addr'],
            power = set_sx126x['power'],
            rssi = set_sx126x['rssi'],
            air_speed = set_sx126x['air_speed'],
            relay = set_sx126x['relay']
            )
        
        self.sender_freq = set_sx126x['freq']
    def receive(self):
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
                msg = self.node.cal_crc(res['message'])
                print(res['message'],msg)
                self.node.send()

if __name__ == "__main__":
    receiver = receiver()
    receiver.receive()
