from dotenv import load_dotenv
from os import getenv
import serial
import paho.mqtt.client as mqtt


def main():
    serial_port = getenv("SERIAL_PORT", default="/dev/ttyACM0")
    serial_speed = getenv("SERIAL_SPEED", default="115200")
    try:
        rasp = serial.Serial(serial_port, int(serial_speed))
    except:
        rasp = None

    def on_connect(client, userdata, flags, rc):
        mqtt_cliente.subscribe("mensagem/#")

    def on_message(client, userdata, msg):
        payload = msg.payload.decode()
        if payload == "enviar_estado_completo":
            print(payload)

    mqtt_cliente = mqtt.Client(transport="websockets")
    mqtt_cliente.ws_set_options(path="/ws/", headers=None)
    mqtt_cliente.tls_set()
    mqtt_cliente.on_connect = on_connect
    mqtt_cliente.on_message = on_message
    mqtt_cliente.connect("ifsc.digital", port=443, keepalive=60)
    mqtt_cliente.loop_forever()


if __name__ == "__main__":
    main()
