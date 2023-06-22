import config from "./config.js";
import bairro from "./bairro.js";
import casa_1 from "./casa_1.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.cliente_mqtt = mqtt.connect("wss://ifsc.digital/ws/");
    this.cliente_mqtt.on("connect", () => {
      this.cliente_mqtt.subscribe("itl20231/estado/#");
    });

    this.pixel = false;

    this.scene.add("bairro", bairro);
    this.scene.add("casa_1", casa_1);
    this.scene.start("bairro");tiles.texture.setFilterMode(Phaser.ScaleModes.NEAREST);
  }
}

window.onload = () => {
  window.game = new Game();
};
