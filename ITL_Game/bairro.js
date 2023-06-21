export default class bairro extends Phaser.Scene {
  constructor () {
    super('bairro')
  }

  preload () {
    this.load.image('BigTile', 'Assets/Tiles/BigTile.png')
    this.load.image(
      'TerrainTile',
      'Assets/Tiles/smallburg_spring_terrain_with_shadows.png'
    )
    this.load.tilemapTiledJSON('map', 'Assets/Map/Map_tele.json')

    this.load.spritesheet('player', 'Assets/Player/Player_spritesheet.png', {
      frameWidth: 16,
      frameHeight: 16
    })

    /* D-pad */
    this.load.image(
      'esquerda',
      './Assets/Tiles/UI/transparentLight/transparentLight22.png'
    )
    this.load.image(
      'direita',
      './Assets/Tiles/UI/transparentLight/transparentLight23.png'
    )
    this.load.image(
      'baixo',
      './Assets/Tiles/UI/transparentLight/transparentLight25.png'
    )
    this.load.image(
      'cima',
      './Assets/Tiles/UI/transparentLight/transparentLight24.png'
    )
  }

  create () {
    this.speed = 250
    this.cursors = this.input.keyboard.createCursorKeys()

    this.map = this.make.tilemap({ key: 'map' })
    this.Bigtile = this.map.addTilesetImage('BigTile', 'BigTile')
    this.TerrainTile = this.map.addTilesetImage('Terrain', 'TerrainTile')

    this.TerrainLayer = this.map.createLayer('Terrain', this.TerrainTile, -224, -128)
    this.FencesAndTreesLayer = this.map.createLayer(
      'FenceAndTrees',
      this.Bigtile,
      -224,
      -128
    )

    this.player = this.physics.add.sprite(736, 656, 'player')
    this.map.createLayer('Doors', this.Bigtile, 288, 128)
    this.map.createLayer('Windows', this.Bigtile, 288, 128)
    this.map.createLayer('OverPlayer', this.Bigtile, 32, -128)

    this.TerrainLayer.setCollisionByProperty({ collides: true })
    this.FencesAndTreesLayer.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.player, this.FencesAndTreesLayer)
    this.physics.add.collider(this.player, this.TerrainLayer)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        start: 8,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        start: 12,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        start: 4,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'stopped',
      frames: this.anims.generateFrameNumbers('player', {
        start: 16,
        end: 17
      }),
      frameRate: 10,
      repeat: -1
    })

    this.esquerda = this.add
      .sprite(32, 260, 'esquerda')
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.player.body.setVelocityX(-this.speed)
        this.player.anims.play('left', true)
      })
      .on('pointerout', () => {
        this.player.body.setVelocityX(0)
      })

    this.direita = this.add
      .sprite(123, 260, 'direita')
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.player.body.setVelocityX(this.speed)
        this.player.anims.play('right', true)
      })
      .on('pointerout', () => {
        this.player.body.setVelocityX(0)
      })

    this.baixo = this.add
      .sprite(78, 260, 'baixo')
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.player.body.setVelocityY(this.speed)
        this.player.anims.play('down', true)
      })
      .on('pointerout', () => {
        this.player.body.setVelocityY(0)
      })

    this.cima = this.add
      .sprite(78, 215, 'cima')
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.player.body.setVelocityY(-this.speed)
        this.player.anims.play('up', true)
      })
      .on('pointerout', () => {
        this.player.setVelocityY(0)
      })

    this.cameras.main.setBounds(0, 0, 1438, 1280)
    this.cameras.main.startFollow(this.player)
  }

  update () {
    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.anims.play('stopped', 'true')
    }
  }
}
