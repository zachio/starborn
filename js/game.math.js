var game = game || {};

game.math = {
    angleBetweenPoints: function (p1x, p1y, p2x, p2y) {
      return Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
    },
    random: function (seed) {
      if (!seed)
        seed = 0;
      seed = (seed*9301+49297) % 233280;
      return seed/(233280.0);
    },
    random2: function (seed) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);

    }
  };