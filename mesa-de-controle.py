from dotenv import load_dotenv
from os import getenv
from sys import argv
import serial
import paho.mqtt.client as mqtt
import re
import redis


def main():
    serial_port = getenv("SERIAL_PORT", default="/dev/ttyACM0")
    serial_speed = int(getenv("SERIAL_SPEED", default="115200"))

    redis_host = getenv("REDIS_HOST", default="localhost")
    redis_port = int(getenv("REDIS_PORT", default="6379"))

    mqtt_broker = getenv("MQTT_BROKER", default="ifsc.digital")
    mqtt_path = getenv("MQTT_PATH", default="/ws/")
    mqtt_port = int(getenv("MQTT_PORT", default="443"))
    mqtt_keepalive = int(getenv("MQTT_KEEPALIVE", default="60"))

    casas = 12
    circuitos = 3

    def on_connect(client, userdata, flags, rc):
        print("Conectado ao servidor MQTT!")
        mqtt_cliente.subscribe("itl20231/mensagem/#")
        mqtt_cliente.subscribe("itl20231/atualizar/#")

    def on_message(client, userdata, msg):
        payload = msg.payload.decode()
        atualizar = re.compile("itl20231/atualizar/1?[0-9]/[0-2]")
        if payload == "enviar_estado_completo":
            for casa in range(1, casas + 1):
                for circuito in range(0, circuitos):
                    valor = redis_cliente.get(str(casa) + str(circuito))
                    mqtt_cliente.publish(
                        "".join(["itl20231/estado/", str(casa), "/", str(circuito)]),
                        valor,
                        1,
                    )
        elif atualizar.match(msg.topic):
            topic = msg.topic.split("/")
            # disciplina = topic[0]
            # mensagem = topic[1]
            casa = topic[2]
            circuito = topic[3]
            redis_cliente.set(casa + circuito, int(payload))
            mqtt_cliente.publish(
                "".join(["itl20231/estado/", casa, "/", circuito]), payload, 1
            )
            if microbit:
                microbit.write("".join([casa, circuito]).encode())
            else:
                print("".join([casa, circuito]))

    try:
        microbit = serial.Serial(serial_port, int(serial_speed))
    except:
        print("Interface serial não detectada. Fechando aplicação...")
    else:
        redis_cliente = redis.Redis(
            host=redis_host, port=redis_port, decode_responses=True
        )

        mqtt_cliente = mqtt.Client(transport="websockets")
        mqtt_cliente.ws_set_options(path=mqtt_path, headers=None)
        mqtt_cliente.tls_set()
        mqtt_cliente.on_connect = on_connect
        mqtt_cliente.on_message = on_message
        mqtt_cliente.connect(mqtt_broker, port=mqtt_port, keepalive=mqtt_keepalive)
        mqtt_cliente.loop_forever()


if __name__ == "__main__":
    main()
