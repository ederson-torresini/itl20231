from sys import stdin
from serial import Serial

rasp = Serial("/dev/ttyACM0", 115200)
for line in stdin:
    rasp.write(line.encode())
