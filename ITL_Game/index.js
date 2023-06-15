const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 1500, // Canvas width in pixels
    height: 1300, // Canvas height in pixels
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image("BigTile", "Assets/Tiles/BigTile.png");
    this.load.image("TerrainTile", "Assets/Tiles/smallburg_spring_terrain_with_shadows.png");
    this.load.tilemapTiledJSON("map", "Assets/Map/Map_tele.json");
    this.load.spritesheet("player", "Assets/Player/Player_spritesheet.png", { 
        frameWidth: 16,
        frameHeight: 16
    });
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" });
    const Bigtile = map.addTilesetImage("BigTile", "BigTile");
    const TerrainTile = map.addTilesetImage("Terrain", "TerrainTile");
  
    const TerrainLayer = map.createLayer("Terrain", TerrainTile, -224, -128);
    const FencesAndTreesLayer = map.createLayer("FenceAndTrees", Bigtile, -224, -128);
    const DoorsLayer = map.createLayer("Doors", Bigtile, 288, 128);
    const WindowsLayer = map.createLayer("Windows", Bigtile, 288, 128);
    const OverPlayerLayer = map.createLayer("OverPlayer", Bigtile,  32, -128);

    player = this.physics.add.sprite(400, 304, "player");
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 6
        }),
        frameRate: 10,
        repeat: -1
    });

  }
  
  function update(time, delta) {
    // Runs once per frame for the duration of the scene
  }
  