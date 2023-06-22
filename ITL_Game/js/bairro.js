export default class bairro extends Phaser.Scene {
  constructor() {
    2;
    super("bairro");
  }

  preload() {
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
    this.load.image("porta", "Assets/Player/vazio.png");

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
    );
    this.load.image(
      "cima",
      "./Assets/Tiles/UI/transparentLight/transparentLight24.png"
    );
  }

  create() {
    this.speed = 150;

    this.map = this.make.tilemap({ key: "map" });
    this.Bigtile = this.map.addTilesetImage("BigTile", "BigTile");
    this.TerrainTile = this.map.addTilesetImage("Terrain", "TerrainTile");

    this.TerrainLayer = this.map.createLayer(
      "Terrain",
      this.TerrainTile,
      -224,
      -128
    );
    this.FencesAndTreesLayer = this.map.createLayer(
      "FenceAndTrees",
      this.Bigtile,
      -224,
      -128
    );

    this.player = this.physics.add.sprite(736, 656, "player");

    this.map.createLayer("Doors", this.Bigtile, 288, 128);
    this.map.createLayer("Windows", this.Bigtile, 288, 128);
    this.map.createLayer("OverPlayer", this.Bigtile, 32, -128);

    this.tampeRect = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      20000,
      20000,
      0x111010
    );
    this.tampeRect.setDepth(1);
    this.tampeRect.setAlpha(0);

    this.TerrainLayer.setCollisionByProperty({ collides: true });
    this.FencesAndTreesLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.FencesAndTreesLayer);
    this.physics.add.collider(this.player, this.TerrainLayer);

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

    this.esquerda = this.add
      .sprite(32, 320, "esquerda")
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on("pointerover", () => {
        this.player.body.setVelocityX(-this.speed);
        this.player.anims.play("left", true);
      })
      .on("pointerout", () => {
        this.player.body.setVelocityX(0);
      });

    this.direita = this.add
      .sprite(123, 320, "direita")
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on("pointerover", () => {
        this.player.body.setVelocityX(this.speed);
        this.player.anims.play("right", true);
      })
      .on("pointerout", () => {
        this.player.body.setVelocityX(0);
      });

    this.baixo = this.add
      .sprite(78, 320, "baixo")
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on("pointerover", () => {
        this.player.body.setVelocityY(this.speed);
        this.player.anims.play("down", true);
      })
      .on("pointerout", () => {
        this.player.body.setVelocityY(0);
      });

    this.cima = this.add
      .sprite(78, 275, "cima")
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on("pointerover", () => {
        this.player.body.setVelocityY(-this.speed);
        this.player.anims.play("up", true);
      })
      .on("pointerout", () => {
        this.player.setVelocityY(0);
      });

    this.portas = [
      {
        numero: 1,
        x: 632,
        y: 340,
      },
      {
        numero: 2,
        x: 840,
        y: 340,
      },
      {
        numero: 3,
        x: 360,
        y: 580,
      },

      {
        numero: 4,
        x: 585,
        y: 580,
      },
      {
        numero: 5,
        x: 889,
        y: 580,
      },
      {
        numero: 6,
        x: 1111,
        y: 580,
      },
      {
      numero: 7,
        x: 360,
        y: 820,
      },
      {
        numero: 8,
          x: 585,
          y: 820,
        },
      {
      numero: 9,
        x: 889,
        y: 820,
      },
      {
        numero: 10,
          x: 1111,
          y: 820,
        },
      {
      numero: 11,
        x: 632,
        y: 1060,
      },
      {
        numero: 12,
          x: 840,
          y: 1060,
        }
      
      
    ];
    this.portas.forEach((porta) => {
      porta.objeto = this.physics.add
        .sprite(porta.x, porta.y, "porta")
        .setImmovable(true);
      porta.objeto.numero = "casa_" + porta.numero;
      this.physics.add.collider(
        this.player,
        porta.objeto,
        this.entrar_na_casa,
        null,
        this
      );
    });

    this.cameras.main.setBounds(0, 0, 1438, 1280);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    try {
      if (
        this.player.body.velocity.x === 0 &&
        this.player.body.velocity.y === 0
      ) {
        this.player.anims.play("stopped", "true");
      }
    } catch (error) {
      console.log(error);
    }

    if (this.game.fundo) {
      this.tampeRect.setAlpha(1);
    } else {
      this.tampeRect.setAlpha(0);
    }
  }


  entrar_na_casa(jogador, casa) {
    this.game.fundo = true;
    this.game.scene.pause("bairro");
    this.game.scene.start(casa.numero);
  }
}
