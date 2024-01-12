from .sx126x import sx126x

class Mysx126x(sx126x):
    
    def receive(self,receive_sleep=0.5):
        # return status,message, rssi
        res = {'status':False,'message':None,'rssi':None}
        if self.ser.inWaiting() > 0:
            
            time.sleep(receive_sleep)
            r_buff = self.ser.read(self.ser.inWaiting())
            
            res['message'] = r_buff[3:-1]
            if self.rssi:
                res['rssi'] = 256-r_buff[-1:][0]
            res['status'] = True
        
        return res