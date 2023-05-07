from sys import stdin
from serial import Serial

# Interface serial: 9.600 bps, bits 8N1
rasp = Serial("/dev/ttyACM0")
for line in stdin:
    rasp.write(line.encode())
