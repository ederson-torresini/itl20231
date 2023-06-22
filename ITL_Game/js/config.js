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
};
