from dotenv import load_dotenv
from os import getenv
from sys import argv
import serial
import paho.mqtt.client as mqtt
import re
import redis


def main():
    redis_host = getenv("REDIS_HOST", default="localhost")
    redis_port = int(getenv("REDIS_PORT", default="6379"))

    casas = 12
    circuitos = 3

    def redis_init():
        for casa in range(1, casas + 1):
            for circuito in range(0, circuitos):
                redis_cliente.set(str(casa) + str(circuito), "0")

    redis_cliente = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
    redis_init()
    print("Alterados os valores dos circuitos para zero.")


if __name__ == "__main__":
    main()
