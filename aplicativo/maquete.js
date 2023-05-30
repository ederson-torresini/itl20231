export default class maquete extends Phaser.Scene {
  constructor() {
    super("maquete");
  }

  preload() {
    this.load.spritesheet("moeda", "./moeda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.cliente_mqtt = mqtt.connect("wss://ifsc.digital/ws/");
    this.cliente_mqtt.on("connect", () => {
      this.cliente_mqtt.subscribe("estado/#");
      this.cliente_mqtt.publish("mensagem", "enviar_estado_completo", {
        qos: 1,
      });
    });

    this.anims.create({
      key: "moeda-parada",
      frames: this.anims.generateFrameNumbers("moeda", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "moeda-girando",
      frames: this.anims.generateFrameNumbers("moeda", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.luzes = [
      {
        numero: "1",
        x: 112,
        y: 64,
      },
      {
        numero: "2",
        x: 112,
        y: 128,
      },
      {
        numero: "3",
        x: 112,
        y: 192,
      },
      {
        numero: "4",
        x: 112,
        y: 256,
      },
      {
        numero: "5",
        x: 112,
        y: 320,
      },
      {
        numero: "6",
        x: 112,
        y: 384,
      },
      {
        numero: "7",
        x: 337,
        y: 64,
      },
      {
        numero: "8",
        x: 337,
        y: 128,
      },
      {
        numero: "9",
        x: 337,
        y: 192,
      },
      {
        numero: "10",
        x: 337,
        y: 256,
      },
      {
        numero: "11",
        x: 337,
        y: 320,
      },
      {
        numero: "12",
        x: 337,
        y: 384,
      },
    ];

    this.luzes.forEach((luz) => {
      let topic = "estado/casa/" + luz.numero + "/luz";

      luz.botao = this.add
        .sprite(luz.x, luz.y, "moeda", 0)
        .play("moeda-parada")
        .setInteractive()
        .on("pointerdown", () => {
          let animacao = luz.botao.anims.getName();
          if (animacao === "moeda-parada") {
            this.cliente_mqtt.publish(topic, "1", {qos: 1});
          } else if (animacao === "moeda-girando") {
            this.cliente_mqtt.publish(topic, "0", { qos: 1 });
          }
        });
    });

    this.cliente_mqtt.on("message", (topic, message) => {
      let comando = message.toString();
      this.luzes.forEach((luz) => {
        if (topic === "estado/casa/" + luz.numero + "/luz") {
          if (comando === "0") {
            luz.botao.play("moeda-parada");
          } else if (comando === "1") {
            luz.botao.play("moeda-girando");
          }
          return;
        }
      });
    });
  }
}
