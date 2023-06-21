import config from './config.js'
import bairro from './bairro.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('bairro', bairro)
    this.scene.start('bairro')
  }
}

window.onload = () => {
  window.game = new Game()
}
