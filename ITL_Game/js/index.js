import config from './config.js'
import bairro from './bairro.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.cliente_mqtt = mqtt.connect('wss://ifsc.digital/ws/')
    this.cliente_mqtt.on('connect', () => {
      this.cliente_mqtt.subscribe('itl20231/estado/#')
      this.cliente_mqtt.publish('itl20231/mensagem', 'jogo-web', {
        qos: 1
      })
    })
    // this.cliente_mqtt.on('message', (topico, mensagem) => { }

    this.scene.add('bairro', bairro)
    this.scene.start('bairro')
  }
}

window.onload = () => {
  window.game = new Game()
}
