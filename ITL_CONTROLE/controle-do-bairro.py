from dotenv import load_dotenv
from os import getenv
from sys import argv
import serial
import paho.mqtt.client as mqtt
import re


def on_connect(client, userdata, flags, rc):
    print("Conectado ao servidor MQTT!")
    mqtt_cliente.subscribe("itl20231/casa/#")


def on_message(client, userdata, msg):
    topico = re.compile("itl20231/casa/1?[0-9]")
    payload = msg.payload.decode()
    if topico.match(msg.topic):
        casa = msg.topic.split("/")[2]  # terceiro nível de tópico
        if microbit:
            microbit.write("".join([casa, payload, "\n"]).encode())
        else:
            print("".join([casa, payload]))


serial_port = getenv("SERIAL_PORT", default="/dev/ttyACM0")
serial_speed = int(getenv("SERIAL_SPEED", default="115200"))
mqtt_broker = getenv("MQTT_BROKER", default="ifsc.digital")
mqtt_path = getenv("MQTT_PATH", default="/ws/")
mqtt_port = int(getenv("MQTT_PORT", default="443"))
mqtt_keepalive = int(getenv("MQTT_KEEPALIVE", default="60"))
mqtt_cliente = mqtt.Client(transport="websockets")
mqtt_cliente.ws_set_options(path=mqtt_path, headers=None)
mqtt_cliente.tls_set()
mqtt_cliente.on_connect = on_connect
mqtt_cliente.on_message = on_message


try:
    microbit = serial.Serial(serial_port, int(serial_speed))
except:
    print("Micro:bit não conectado!")
else:
    mqtt_cliente.connect(mqtt_broker, port=mqtt_port, keepalive=mqtt_keepalive)
    mqtt_cliente.loop_forever()
