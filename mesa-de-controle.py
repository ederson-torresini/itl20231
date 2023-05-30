from dotenv import load_dotenv
from os import getenv
import serial
import paho.mqtt.client as mqtt
import re


def main():
    serial_port = getenv("SERIAL_PORT", default="/dev/ttyACM0")
    serial_speed = getenv("SERIAL_SPEED", default="115200")

    mqtt_broker = "ifsc.digital"
    mqtt_path = "/ws/"
    mqtt_port = 443
    mqtt_keepalive = 60

    casas = {
        "1": {"0": 0, "1": 0, "2": 0},
        "2": {"0": 0, "1": 0, "2": 0},
        "3": {"0": 0, "1": 0, "2": 0},
        "4": {"0": 0, "1": 0, "2": 0},
        "5": {"0": 0, "1": 0, "2": 0},
        "6": {"0": 0, "1": 0, "2": 0},
        "7": {"0": 0, "1": 0, "2": 0},
        "8": {"0": 0, "1": 0, "2": 0},
        "9": {"0": 0, "1": 0, "2": 0},
        "10": {"0": 0, "1": 0, "2": 0},
        "11": {"0": 0, "1": 0, "2": 0},
        "12": {"0": 0, "1": 0, "2": 0},
    }

    try:
        microbit = serial.Serial(serial_port, int(serial_speed))
        print("Interface serial detectada.")
    except:
        microbit = None
        print("Interface serial não detectada. Rodando em modo de teste...")

    def on_connect(client, userdata, flags, rc):
        print("Conectado ao servidor MQTT!")
        mqtt_cliente.subscribe("mensagem/#")
        mqtt_cliente.subscribe("atualizar/#")

    def on_message(client, userdata, msg):
        payload = msg.payload.decode()
        atualizar = re.compile("atualizar\/1?[0-9]\/[0-2]")
        if payload == "enviar_estado_completo":
            for index, values in casas.items():
                for key, value in values.items():
                    mqtt_cliente.publish(
                        "".join(["estado/", index, "/", key]), value, 1
                    )
        elif atualizar.match(msg.topic):
            topic = msg.topic.split("/")
            casa = topic[1]
            luz = topic[2]
            casas[casa][luz] = int(payload)
            mqtt_cliente.publish("".join(["estado/", casa, "/", luz]), payload, 1)
            if microbit:
                microbit.write("".join([casa, luz]).encode())
            else:
                print("".join([casa, luz]))

    mqtt_cliente = mqtt.Client(transport="websockets")
    mqtt_cliente.ws_set_options(path=mqtt_path, headers=None)
    mqtt_cliente.tls_set()
    mqtt_cliente.on_connect = on_connect
    mqtt_cliente.on_message = on_message
    mqtt_cliente.connect(mqtt_broker, port=mqtt_port, keepalive=mqtt_keepalive)
    mqtt_cliente.loop_forever()


if __name__ == "__main__":
    main()
