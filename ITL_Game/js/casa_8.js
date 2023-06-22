export default class casa_8 extends Phaser.Scene {
  constructor() {
    super("casa_8");
  }

  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
    this.load.image(
      "Base_Interior",
      "Assets/Tiles/Room_Builder_free_16x16.png"
    );
    this.load.image(
      "Interiors_Forniture",
      "Assets/Tiles/Interiors_free_16x16.png"
    );
    this.load.image("BigTile", "Assets/Tiles/BigTile.png");
    this.load.tilemapTiledJSON("casa_8", "Assets/Map/Casas/casa_8.json");

    this.load.spritesheet("player", "Assets/Player/Player_spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("computador", "Assets/Player/vazio.png");
    this.load.image("menuI", "Assets/Tiles/UI/Menu_open.png");
    this.load.image("exit", "Assets/Tiles/UI/transparentLight/transparentLight33.png");

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
    
    this.Pmove = true;
    this.speed = 70;

    WebFont.load({
      custom: {
        families: ["Monofett"],
        urls: ["../../../index.css"],
      }
    });

    this.map = this.make.tilemap({ key: "casa_8" });
    this.Base_Interior = this.map.addTilesetImage(
      "Base_Interior",
      "Base_Interior"
    );
    this.Bigtile = this.map.addTilesetImage("BigTile", "BigTile");
    this.Interiors_Forniture = this.map.addTilesetImage(
      "Interiors_Forniture",
      "Interiors_Forniture"
    );

    this.Base = this.map.createLayer("Base", this.Base_Interior, 80, 0);
    this.Walls = this.map.createLayer("Walls", this.Bigtile, 80, 0);

    this.BellowForn = this.map.createLayer(
      "BellowForn",
      this.Interiors_Forniture,
      80,
      0
    );
    this.Forniture = this.map.createLayer(
      "Forniture",
      this.Interiors_Forniture,
      80,
      0
    );
    this.player = this.physics.add.sprite(370, 300, "player");
    this.OverWalls = this.map.createLayer(
      "OverWalls",
      this.Interiors_Forniture,
      80,
      0
    );
    this.Walls_transparent = this.map.createLayer(
      "Walls_transparent",
      this.Bigtile,
      80,
      0
    );
    this.Door = this.map.createLayer("Door", this.Bigtile, 80, 0);

    this.Walls.setCollisionByProperty({ collides: true });
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
      .sprite(383, 50, "computador")
      .setImmovable(true);

    this.physics.add.collider(
      this.player,
      this.computador,
      this.mostrar_painel,
      null,
      this
    );

    this.saidaCasa = this.physics.add
      .sprite(287, 380, "computador")
      .setImmovable(true);

    this.physics.add.collider(
      this.player,
      this.saidaCasa,
      this.sair_da_casa,
      null,
      this
    );
    
        
      
      this.esquerda = this.add
        .sprite(32, 320, "esquerda")
        .setScrollFactor(0)
        .setScale(0.5)
        .setInteractive()
        .on("pointerover", () => {
          if (this.Pmove) {
            this.player.body.setVelocityX(-this.speed);
            this.player.anims.play("left", true);
          }
          
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
          if (this.Pmove) {
            this.player.body.setVelocityX(this.speed);
            this.player.anims.play("right", true);
          }
          
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
          if (this.Pmove) {
             this.player.body.setVelocityY(this.speed);
             this.player.anims.play("down", true);
          }
         
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
          if (this.Pmove) {
            this.player.body.setVelocityY(-this.speed);
            this.player.anims.play("up", true);
          }

        })
        .on("pointerout", () => {
          this.player.setVelocityY(0);
        });
    
     this.cameras.main.setBounds(0, 0, 400, 384);
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

    this.game.leo_mqtt.on("message", (topic, payload) => {
      payload = payload.toString();

      if (topic === "leojung/temperatura") {
        console.log(payload);
      }
    });
  }

  sair_da_casa() {
    this.game.scene.stop("casa_8");
    this.game.fundo = false;
    this.game.scene.resume("bairro");
  }

  mostrar_painel() {
    this.Pmove = false;
    this.menuImage = this.add.image(
      this.game.config.width / 2,
      this.game.config.width / 2 - 190  ,
      "menuI"
    );
    this.botao_0 = this.add
      .text(250 , 20 , "80", {
        fontFamily: "Monofett",
        fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/8", "0", {
          qos: 1,
        });
      });
    this.botao_1 = this.add
      .text(330, 20, "81", {
        fontFamily: "Monofett",
        fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/8", "1", {
          qos: 1,
        });
      });
    this.botao_2 = this.add
      .text(250, 70, "82", {
        fontFamily: "Monofett",
        fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/8", "2", {
          qos: 1,
        });
      });
    this.botao_3 = this.add
      .text(330, 70, "83", {
        fontFamily: "Monofett",
        fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/8", "3", {
          qos: 1,
        });
      });
    this.botao_4 = this.add
      .text(250, 120, "84", {
        fontFamily: "Monofett",
        fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/8", "4", {
          qos: 1,
        });
      });
      this.botao_5 = this.add
        .text(330, 120, "85", {
          fontFamily: "Monofett",
          fontSize: "50px", // Definindo o tamanho da fonte para 20 pixels
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.game.cliente_mqtt.publish("itl20231/casa/7", "85", {
            qos: 1,
          });
        });
    this.botao_exit = this.add
      .sprite(this.game.config.width / 2,
      this.game.config.width / 2 - 100 , "exit")
      .setScrollFactor(0)
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.botao_exit.destroy();
        this.menuImage.destroy();
        this.botao_0.destroy();
        this.botao_1.destroy();
        this.botao_2.destroy();
        this.botao_3.destroy();
        this.botao_4.destroy();
        this.botao_5.destroy();
        this.Pmove = true;
      })
  }
}
