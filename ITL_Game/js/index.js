import config from "./config.js";
import bairro from "./bairro.js";
import casa_1 from "./casa_1.js";
import casa_2 from "./casa_2.js";
import casa_3 from "./casa_3.js";
import casa_4 from "./casa_4.js";
import casa_5 from "./casa_5.js";
import casa_6 from "./casa_6.js";
import casa_7 from "./casa_7.js";
import casa_8 from "./casa_8.js";
import casa_9 from "./casa_9.js";
import casa_10 from "./casa_10.js";
import casa_11 from "./casa_11.js";
import casa_12 from "./casa_12.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.cliente_mqtt = mqtt.connect("wss://ifsc.digital/ws/");
    this.cliente_mqtt.on("connect", () => {
      this.cliente_mqtt.subscribe("itl20231/estado/#");
    });

    this.leo_mqtt = mqtt.connect("wss://ifsc.digital/ws/");
    this.leo_mqtt.on("connect", () => {
      this.leo_mqtt.subscribe("leojung/#");
    });

    this.leo_mqtt.on("message", (topic, payload) => {
      payload = payload.toString();
    });

    this.fundo = false;

    this.scene.add("bairro", bairro);
    this.scene.add("casa_1", casa_1);
    this.scene.add("casa_2", casa_2);
    this.scene.add("casa_3", casa_3);
    this.scene.add("casa_4", casa_4);
    this.scene.add("casa_5", casa_5);
    this.scene.add("casa_6", casa_6);
    this.scene.add("casa_7", casa_7);
    this.scene.add("casa_8", casa_8);
    this.scene.add("casa_9", casa_9);
    this.scene.add("casa_10", casa_10);
    this.scene.add("casa_11", casa_11);
    this.scene.add("casa_12", casa_12);
    this.scene.start("bairro");
  }
}

window.onload = () => {
  window.game = new Game();
};
