var game = game || {};

game.math = {
    //Gives the angle in radians
    angle: function (p1x, p1y, p2x, p2y) {
      return Math.atan2(p2y - p1y, p2x - p1x);
    },
    random2: function (seed) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    },
    pRand: function(x, y, min, max) {
      /* global noise */
      return Math.floor(Math.abs(noise.simplex2(x + game.config.seed, y + game.config.seed)) * (max - min) + min);
    },
    // Position relative to the player position used to draw on canvas
    position: function(x, y) {
      return {
        x: -game.player.x * game.tile.width + x * game.tile.width + game.tile.width / 2 + window.innerWidth / 2,
        y: -game.player.y * game.tile.height + y * game.tile.height + game.tile.height / 2 + window.innerHeight / 2
      };
    }
  };