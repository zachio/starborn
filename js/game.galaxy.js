var game = game || {};

game.galaxy = {
    width: 65535,
    height: 65535,
    idAt: function (x, y) {
      var id = y * this.width + x;
      return id;
    },
    starAt: function (x, y) {

        /* global noise */
        if( noise.simplex2(x, y) > 0.9) {
          return true;
        } else {
          return false;
        }
    
      
    },
    draw: function () {
      for(var x = game.tile.x - 2; x < game.tile.x + 2; x++) {
        for(var y = game.tile.y - 2; y < game.tile.y + 2; y++) {
          game.ctx.save();
          game.ctx.translate(window.innerWidth / 2 - game.player.x, 
            window.innerHeight / 2 - game.player.y);
          game.ctx.drawImage(game.assets.sprites[0].image, 
            game.assets.sprites[0].image.width * x, 
            game.assets.sprites[0].image.height * y);
          game.ctx.restore();
        }
      }
    },
    update: function () {

    },
    StarSystem: function (x, y) {
      this.x = x;
      this.y = y;
      this.name = game.galaxy.starName(x, y);
      this.planets = game.galaxy.planets(x, y);
    },
    debug: null,
    starName: function(x, y) {
      if(this.starAt(x, y)) {
        var syllable = {
          min: 3,
          max: 8,
          words: [
            "lo", "fa", "for", "mat", "at", "ab", "ba", "co", "ca", "ap", "ck", 
            "to", "pe", "qu", "ir", "ko", "x", "zo", "zeo", "pla", "mn", "mo", 
            "do", "da", "plo", "ch", "io", "z"
            ],
          count: 0
        };
        syllable.count = game.math.pRand(x, y, syllable.min, syllable.max);
        var starname = "";
        for(var s = 0; s < syllable.count; s++) {
          starname += syllable.words[game.math.pRand(x + s + x, y + s + y, 
          0, syllable.words.length - 1)];
        }
        return starname.charAt(0).toUpperCase() + starname.slice(1) + " System";
      } else { return false }
    },
    planetCount: function(x,y) {
      if(this.starAt(x, y)) {
        return game.math.pRand(x, y, 1, 12);
      } else { return false }
    }
  };