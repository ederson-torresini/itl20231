const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 640, // Canvas width in pixels
  height: 360, // Canvas height in pixels
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 }, // Top down game, so no gravity
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 300,
  },
};

const game = new Phaser.Game(config);
let player;
let dir;
const speed = 250;

function preload() {
  this.load.image("BigTile", "Assets/Tiles/BigTile.png");
  this.load.image(
    "TerrainTile",
    "Assets/Tiles/smallburg_spring_terrain_with_shadows.png"
  );
  this.load.tilemapTiledJSON("map", "Assets/Map/Map_tele.json");

  this.load.spritesheet("player", "Assets/Player/Player_spritesheet.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  /* D-pad */
  this.load.image(
    "esquerda",
    "./Assets/Tiles/UI/transparentLight/transparentLight22.png"
  );
  this.load.image(
    "direita",
    "./Assets/Tiles/UI/transparentLight/transparentLight23.png"
  );
  this.load.image(
    "baixo",
    "./Assets/Tiles/UI/transparentLight/transparentLight25.png"
  )
  this.load.image(
    "cima",
    "./Assets/Tiles/UI/transparentLight/transparentLight24.png"
  )
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  const map = this.make.tilemap({ key: "map" });
  const Bigtile = map.addTilesetImage("BigTile", "BigTile");
  const TerrainTile = map.addTilesetImage("Terrain", "TerrainTile");

  const TerrainLayer = map.createLayer("Terrain", TerrainTile, -224, -128);
  const FencesAndTreesLayer = map.createLayer(
    "FenceAndTrees",
    Bigtile,
    -224,
    -128
  );

  player = this.physics.add.sprite(736, 656, "player");
  const DoorsLayer = map.createLayer("Doors", Bigtile, 288, 128);
  const WindowsLayer = map.createLayer("Windows", Bigtile, 288, 128);
  const OverPlayerLayer = map.createLayer("OverPlayer", Bigtile, 32, -128);

  TerrainLayer.setCollisionByProperty({ collides: true });
  FencesAndTreesLayer.setCollisionByProperty({ collides: true });

  this.physics.add.collider(player, FencesAndTreesLayer);
  this.physics.add.collider(player, TerrainLayer);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("player", {
      start: 4,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped",
    frames: this.anims.generateFrameNumbers("player", {
      start: 16,
      end: 17,
    }),
    frameRate: 10,
    repeat: -1,
  });

  esquerda = false;
  direita = false;
  this.esquerda = this.add
    .sprite(32, 260, "esquerda")
    .setScrollFactor(0)
    .setScale(0.5)
    .setInteractive()
    .on("pointerover", () => {
      player.body.setVelocityX(-speed);
      player.anims.play("left", true);
    })
    .on("pointerout", () => {
      player.body.setVelocityX(0);
    });

  this.direita = this.add
    .sprite(123, 260, "direita")
    .setScrollFactor(0)
    .setScale(0.5)
    .setInteractive()
    .on("pointerover", () => {
      player.body.setVelocityX(speed);
      player.anims.play("right", true);
    })
    .on("pointerout", () => {
      player.body.setVelocityX(0);
    })
  this.baixo = this.add
    .sprite(78, 260, "baixo")
    .setScrollFactor(0)
    .setScale(0.5)
    .setInteractive()
    .on("pointerover", () => {
      player.body.setVelocityY(speed);
      player.anims.play("down", true)
  })
    .on("pointerout", () => {
      player.body.setVelocityY(0)
    })
  this.cima = this.add
    .sprite(78, 215, "cima")
    .setScrollFactor(0)
    .setScale(0.5)
    .setInteractive()
    .on("pointerover", () => {
      player.body.setVelocityY(-speed);
      player.anims.play("up", true)
    })
    .on("pointerout", () => {
      player.setVelocityY(0);
  })

  /*let pixelationPipeline = game.renderer.addPipeline(
    "Pixelation",
    new PixelationPipeline(game)
  );
  this.cameras.main.setRenderToTexture(pixelationPipeline);
  pixelationPipeline.setResolution(2);*/
  this.cameras.main.setBounds(0, 0, 1438, 1280);
  this.cameras.main.startFollow(player);
}

function update(time, delta) {
  if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
    player.anims.play("stopped", "true");
  }

  //player.body.velocity.normalize().scale(speed);
}
