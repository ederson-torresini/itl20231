export default {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 360
  }
};
