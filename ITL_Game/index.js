const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 1500, // Canvas width in pixels
  height: 1300, // Canvas height in pixels
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config);
let player;

function preload() {
  this.load.image("BigTile", "Assets/Tiles/BigTile.png");
  this.load.image("TerrainTile", "Assets/Tiles/smallburg_spring_terrain_with_shadows.png");
  this.load.tilemapTiledJSON("map", "Assets/Map/Map_Tele.json");
  this.load.spritesheet("player","Assets/Player/Player_spritesheet.png", {
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
  player = this.physics.add.sprite(736,656, "player");
  const DoorsLayer = map.createLayer("Doors", Bigtile, 288, 128);
  const WindowsLayer = map.createLayer("Windows", Bigtile, 288, 128);
  const OverPlayerLayer = map.createLayer("OverPlayer", Bigtile,  32, -128);

  TerrainLayer.setCollisionByProperty({ collides: true });
  FencesAndTreesLayer.setCollisionByProperty({ collides: true });


  this.physics.add.collider(player, FencesAndTreesLayer);
  this.physics.add.collider(player, TerrainLayer);


  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", {
      start: 8,
      end: 11
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", {
      start: 12,
      end: 15
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("player", {
      start: 4,
      end: 7
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "stopped",
    frames: this.anims.generateFrameNumbers("player", {
      start: 16,
      end: 17
    }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  

}

function update(time, delta) {
  let dir = 0;
  let speed = 100
  if(cursors.left.isDown){
    player.body.setVelocityX(-speed);
    dir = 4;
  } else if(cursors.right.isDown){
    player.body.setVelocityX(speed);
    dir = 2;
  }else{
    player.body.setVelocityX(0);
  }

  if(cursors.up.isDown){
    player.body.setVelocityY(-speed);
    dir = 1;
  } else if(cursors.down.isDown){
    player.body.setVelocityY(speed);
    dir = 3;
  }else{
    player.body.setVelocityY(0);
  }

  if(!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown){
    dir = 0;
  }
  if(cursors.left.isDown && cursors.down.isDown){
    dir = 4;
  }else if(cursors.right.isDown && cursors.down.isDown){
    dir = 2;
  }

  switch(dir){

    case 0:
    player.anims.play("stopped", "true");
    break;
    case 1:
      player.anims.play("up", "true");
    break;
    case 2:
      player.anims.play("right", "true");
    break;
    case 3:
      player.anims.play("down", "true");
    break;
    case 4:
      player.anims.play("left", "true");
    break;


  }

  player.body.velocity.normalize().scale(speed);

}
