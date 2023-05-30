import config from "./config.js";
import maquete from "./maquete.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("maquete", maquete);
    this.scene.start("maquete");
  }
}

window.onload = () => {
  window.game = new Game();
};
