export default class casa_1 extends Phaser.Scene {
  constructor() {
    super("casa_1");
  }

  preload() {
    this.load.image(
      "Base_Interior",
      "Assets/Tiles/Room_Builder_free_16x16.png"
    );
    this.load.image(
      "Interiors_Forniture",
      "Assets/Tiles/Interiors_free_16x16.png"
    );
    this.load.image("BigTile", "Assets/Tiles/BigTile.png");
    this.load.tilemapTiledJSON("casa_1", "Assets/Map/Casas/casa_1.json");

    this.load.spritesheet("player", "Assets/Player/Player_spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("computador", "Assets/Player/vazio.png");

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
    this.speed = 50;

    this.map = this.make.tilemap({ key: "casa_1" });
    this.Base_Interior = this.map.addTilesetImage(
      "Base_Interior",
      "Base_Interior"
    );
    this.Bigtile = this.map.addTilesetImage("BigTile", "BigTile");
    this.Interiors_Forniture = this.map.addTilesetImage(
      "Interiors_Forniture",
      "Interiors_Forniture"
    );

    this.Base = this.map.createLayer("Base", this.Base_Interior, 0, 0);
    this.Walls = this.map.createLayer("Walls", this.Bigtile, 0, 0);

    this.BellowForn = this.map.createLayer(
      "BellowForn",
      this.Interiors_Forniture,
      0,
      0
    );
    this.Forniture = this.map.createLayer(
      "Forniture",
      this.Interiors_Forniture,
      0,
      0
    );
    this.player = this.physics.add.sprite(240, 300, "player");
    this.OverWalls = this.map.createLayer(
      "OverWalls",
      this.Interiors_Forniture,
      0,
      0
    );
    this.Walls_transparent = this.map.createLayer(
      "Walls_transparent",
      this.Bigtile,
      0,
      0
    );
    this.Door = this.map.createLayer("Door", this.Bigtile, 0, 0);

    //this.Walls.setCollisionByProperty({ collides: true });
    this.Forniture.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.Walls, null, null, this);
    this.physics.add.collider(this.player, this.Forniture, null, null, this);

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

    this.computador = this.physics.add
      .sprite(300, 50, "computador")
      .setImmovable(true);

    this.physics.add.collider(
      this.player,
      this.computador,
      this.mostrar_painel,
      null,
      this
    );

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

    this.game.leo_mqtt.on("message", (topic, payload) => {
      payload = payload.toString();

      if (topic === "leojung/temperatura") {
        console.log(payload);
      }
    });
  }

  sair_da_casa() {
    this.game.scene.stop("casa_1");
    this.game.scene.start("bairro");
  }

  mostrar_painel() {
    this.botao_0 = this.add
      .text(this.game.config.width - 100, this.player.y + 100, "1", {
        fontFamily: "Monofett",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/1", "0", {
          qos: 1,
        });
        this.botao_0.destroy();
      });
  }
}
