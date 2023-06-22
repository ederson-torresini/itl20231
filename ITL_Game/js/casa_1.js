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
  }

  create() {
    this.speed = 250;

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

    this.player = this.physics.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "player"
    );

    this.map.createLayer("BellowForn", this.Interiors_Forniture, 0, 0);
    this.map.createLayer("Forniture", this.Interiors_Forniture, 0, 0);
    this.map.createLayer("OverWalls", this.Interiors_Forniture, 0, 0);
    this.map.createLayer("Walls_transparent", this.Bigtile, 0, 0);
    this.map.createLayer("Door", this.Bigtile, 0, 0);

    this.Walls.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.TerrainLayer);

    this.botao_0 = this.add
      .text(this.player.x, this.player.y + 100, "1", {
        fontFamily: "Monofett",
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.game.cliente_mqtt.publish("itl20231/casa/1", "0", {
          qos: 1,
        });
      });

    this.time.delayedCall(
      10000,
      () => {
        this.game.scene.stop("casa_1");
        this.game.scene.start("bairro");
      },
      null,
      this
    );
  }
}
