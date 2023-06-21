export default class casa_1 extends Phaser.Scene {
  constructor () {
    super('casa_1')
  }

  preload () {
    this.load.image(
      'TerrainTile',
      'Assets/Tiles/Tiles/Room_Builder_free_16x16.png'
    )
    this.load.image(
      'TerrainTile',
      'Assets/Tiles/Tiles/Interiors_free_16x16.png'
    )
    this.load.tilemapTiledJSON('casa_1', 'Assets/Map/Casas/casa_1.json')

    this.load.spritesheet('player', 'Assets/Player/Player_spritesheet.png', {
      frameWidth: 16,
      frameHeight: 16
    })
  }

  create () {
    this.game.cliente_mqtt.publish('itl20231/mensagem', 'casa 1', {
      qos: 1
    })

    this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player', 17)

    this.time.delayedCall(
      3000,
      () => {
        this.game.scene.stop('casa_1')
        this.game.scene.start('bairro')
      },
      null,
      this
    )
  }
}
