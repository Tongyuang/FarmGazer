from LoRa import sx126x
import time
import sys
import yaml
import os
import zlib

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
        self.MAX_DATA_LENGTH = 90 
        
    def make_bytes_flow(self,bytes_flow_in,receiver_addr=0,sender_addr=0):
        # return a single bytes flow
       
        # make smaller lora messages
        assert len(bytes_flow_in) <= self.MAX_DATA_LENGTH
        offset_freq = int(self.sender_freq)-(850 if int(self.sender_freq)>850 else 410)
        
        # high 8-bit addr + low 8-bit addr + freq
        receiver_info_bytes = bytes([receiver_addr>>8]) + bytes([receiver_addr&0xff]) + bytes([offset_freq])
        
        # high 8-bit addr + low 8-bit addr + freq
        sender_info_bytes = bytes([sender_addr>>8]) + bytes([sender_addr&0xff]) + bytes([offset_freq])        

        # concatenate
        return receiver_info_bytes + sender_info_bytes + bytes_flow_in 
    
    def make_bytes_flows(self,bytes_flow_in,receiver_addr=0,sender_addr=0):
        # returns a queue
        # if the bytes flow is too long, split the bytes flow by the self.MAX_DATA_LENGTH
        sender_queue = []
        num_pkg,rmn = len(bytes_flow_in) // self.MAX_DATA_LENGTH, len(bytes_flow_in)%self.MAX_DATA_LENGTH
        if rmn != 0:
            num_pkg += 1
        for i in range(num_pkg):
            if i != num_pkg-1:
                sub_bytes_flow = bytes_flow_in[i*self.MAX_DATA_LENGTH : (i+1)*self.MAX_DATA_LENGTH]
            else:
                sub_bytes_flow = bytes_flow_in[i*self.MAX_DATA_LENGTH:]
            
            sender_queue.append(self.make_bytes_flow(sub_bytes_flow,receiver_addr,sender_addr))
            
        return sender_queue
       
    def get_str_messages(self,data_in,receiver_addr=0,sender_addr=0):
        # return list of bytes flow
        data_in_bytes = data_in.encode()

        return self.make_bytes_flows(data_in_bytes,receiver_addr,sender_addr)
    
    def send_str_message(self,message="Hello",delay=0.2):
        
        sender_queue = self.get_str_messages(data_in=message)
        
        for i in range(len(sender_queue)):
            self.node.send(sender_queue[i])
            time.sleep(delay)
    
    def send_bytes_message(self,byte_message_in=""):
        sender_bytes_flow = self.make_bytes_flow(byte_message_in)
        self.node.send(sender_bytes_flow)
        
    def send_bytes_messages(self,byte_message_in="",delay=1):
        # send multiple messages, delay is the time between two messages
        sender_queue = self.make_bytes_flows(byte_message_in)
        
        for i in range(len(sender_queue)):
            self.node.send(sender_queue[i])
            if i < len(sender_queue)-1:
                time.sleep(delay)
    

        
class imageSender:
    @staticmethod
    def cal_crc(byte_flow):
        return zlib.crc32(byte_flow)
    
    def __init__(self,lora_module='sx126x'):
        if lora_module == 'sx126x':
            self.sender = sx126x_sender()
        else:
            self.sender = None
    
    def load_image(self,image_path=""):
        # load image as bytes
        # return bytes
        if not os.path.exists(image_path):
            print('Image not found at addr {}'.format(image_path))
            return
        with open(image_path,"rb") as rf:
            image_bytes = rf.read()
        
        return image_bytes

    def send_image(self,image_path="",delay=1,tag='Image'):
        sender_queue = self.sender.make_bytes_flows(self.load_image(image_path))
        sender_queue.insert('tag',0)
        for i in range(len(sender_queue)):
            
            self.sender.node.send(sender_queue[i])
            # wait for receiver to send back the CRC
            while()
            #if i < len(sender_queue)-1:
                #time.sleep(delay)
        
if __name__ == "__main__":
    
    # test_image_path = '/home/pi/code/dataset/mnist/testSample/img_1.jpg'
    # image_sender = imageSender()
    # byte_flow = image_sender.load_image(test_image_path)
    # # image_sender.sender.send_byte_message(byte_flow)
    # subflow = byte_flow[1:91]
    # print(zlib.crc32(subflow))
    # print(len(byte_flow))
    # print(byte_flow[1])
    # print(len("Hello".encode()))
    # print("Hello".encode()[0])
