export default class maquete extends Phaser.Scene {
  constructor () {
    super('maquete')
  }

  preload () {
    this.load.spritesheet('moeda', './moeda.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    this.cliente_mqtt = mqtt.connect('wss://ifsc.digital/ws/')
    this.cliente_mqtt.on('connect', () => {
      this.cliente_mqtt.subscribe('itl20231/estado/#')
      this.cliente_mqtt.publish('itl20231/mensagem', 'enviar_estado_completo', {
        qos: 1
      })
    })

    this.anims.create({
      key: 'moeda-parada',
      frames: this.anims.generateFrameNumbers('moeda', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'moeda-girando',
      frames: this.anims.generateFrameNumbers('moeda', {
        start: 0,
        end: 3
      }),
      frameRate: 8,
      repeat: -1
    })

    this.casas = [
      {
        numero: '1',
        x: 112,
        y: 64,
        circuitos: []
      },
      {
        numero: '2',
        x: 112,
        y: 128,
        circuitos: []
      },
      {
        numero: '3',
        x: 112,
        y: 192,
        circuitos: []
      },
      {
        numero: '4',
        x: 112,
        y: 256,
        circuitos: []
      },
      {
        numero: '5',
        x: 112,
        y: 320,
        circuitos: []
      },
      {
        numero: '6',
        x: 112,
        y: 384,
        circuitos: []
      },
      {
        numero: '7',
        x: 337,
        y: 64,
        circuitos: []
      },
      {
        numero: '8',
        x: 337,
        y: 128,
        circuitos: []
      },
      {
        numero: '9',
        x: 337,
        y: 192,
        circuitos: []
      },
      {
        numero: '10',
        x: 337,
        y: 256,
        circuitos: []
      },
      {
        numero: '11',
        x: 337,
        y: 320,
        circuitos: []
      },
      {
        numero: '12',
        x: 337,
        y: 384,
        circuitos: []
      }
    ]

    this.casas.forEach((casa) => {
      [0, 1, 2].forEach((circuito, indice) => {
        const topico = 'itl20231/atualizar/' + casa.numero + '/' + circuito
        const desativar = indice * 2
        const ativar = desativar + 1

        let x
        if (casa.numero <= 6) { x = casa.x - circuito * 48 } else { x = casa.x + circuito * 48 }

        casa.circuitos[circuito] = this.add
          .sprite(x, casa.y, 'moeda', 0)
          .play('moeda-parada')
          .setInteractive()
          .on('pointerdown', () => {
            const animacao = casa.circuitos[circuito].anims.getName()
            if (animacao === 'moeda-parada') {
              this.cliente_mqtt.publish(topico, ativar.toString(), { qos: 1 })
            } else if (animacao === 'moeda-girando') {
              this.cliente_mqtt.publish(topico, desativar.toString(), { qos: 1 })
            }
          })
      })
    })

    this.cliente_mqtt.on('message', (topico, mensagem) => {
      const comando = mensagem.toString()

      this.casas.forEach((casa) => {
        [0, 1, 2].forEach((circuito, indice) => {
          const desativar = indice * 2
          const ativar = desativar + 1

          if (topico === 'itl20231/estado/' + casa.numero + '/' + circuito) {
            if (comando === desativar.toString()) {
              casa.circuitos[circuito].play('moeda-parada')
            } else if (comando === ativar.toString()) {
              casa.circuitos[circuito].play('moeda-girando')
            }
          }
        })
      })
    })
  }
}
