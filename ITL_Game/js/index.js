import config from './config.js'
import bairro from './bairro.js'
import casa1 from './casa_1.js'
import casa2 from './casa_2.js'
import casa3 from './casa_3.js'
import casa4 from './casa_4.js'
import casa5 from './casa_5.js'
import casa6 from './casa_6.js'
import casa7 from './casa_7.js'
import casa8 from './casa_8.js'
import casa9 from './casa_9.js'
import casa10 from './casa_10.js'
import casa11 from './casa_11.js'
import casa12 from './casa_12.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.cliente_mqtt = mqtt.connect('wss://ifsc.digital/ws/')
    this.cliente_mqtt.on('connect', () => {
      this.cliente_mqtt.subscribe('itl20231/estado/#')
    })

    this.leo_mqtt = mqtt.connect('wss://ifsc.digital/ws/')
    this.leo_mqtt.on('connect', () => {
      this.leo_mqtt.subscribe('leojung/#')
    })

    this.leo_mqtt.on('message', (topic, payload) => {
      payload = payload.toString()
    })

    this.fundo = false

    this.scene.add('bairro', bairro)
    this.scene.add('casa1', casa1)
    this.scene.add('casa2', casa2)
    this.scene.add('casa3', casa3)
    this.scene.add('casa4', casa4)
    this.scene.add('casa5', casa5)
    this.scene.add('casa6', casa6)
    this.scene.add('casa7', casa7)
    this.scene.add('casa8', casa8)
    this.scene.add('casa9', casa9)
    this.scene.add('casa10', casa10)
    this.scene.add('casa11', casa11)
    this.scene.add('casa12', casa12)
    this.scene.start('bairro')
  }
}

window.onload = () => {
  window.game = new Game()
}
