const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "Assets/Tiles/tilemap_packed.png");
  this.load.tilemapTiledJSON("map", "Assets/Maps/map.json");
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("tilemap_packed", "tiles");

  const belowLayer = map.createLayer("Terrain", tileset, 0, 0);
  const worldLayer = map.createLayer("Outside", tileset, 0, 0);
  const aboveLayer = map.createLayer("AbovePlayer", tileset, 0, 0);
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
}
