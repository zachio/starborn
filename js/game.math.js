var game = game || {};

game.math = {
    angleBetweenPoints: function (p1x, p1y, p2x, p2y) {
      return Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
    },
    random2: function (seed) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    },
    pRand: function(x, y, min, max) {
      /* global noise */
      return Math.floor(Math.abs(noise.simplex2(x + game.config.seed, y + game.config.seed)) * (max - min) + min);
    }
  };