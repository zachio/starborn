var game = game || {};

game.galaxy = {
    width: 65535,
    height: 65535,
    scale: 2,
    idAt: function (x, y) {
      var id = y * this.width + x;
      return id;
    },
    starAt: function (x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
        /* global noise */
        if( noise.simplex2(x, y) > 0.9) {
          return true;
        } else {
          return false;
        }
    },
    draw: function () {
      var scale = game.getScale();
      var tile = {
        width: game.tile.width * scale,
        height: game.tile.height * scale
      };
      //Chunks are drawn 4 x 4
      for(var chunkX = game.chunk.x - 2; chunkX <= game.chunk.x + 2; chunkX++ ) {
        for(var chunkY = game.chunk.y - 2; chunkY <= game.chunk.y + 2; chunkY++) {
          game.ctx.strokeStyle = "red";
          for(var x = chunkX * game.chunk.width; x < game.chunk.width * chunkX + game.chunk.width; x++) {
            for(var y = chunkY * game.chunk.height; y < game.chunk.height * chunkY + game.chunk.height; y++) {
              if (game.galaxy.starAt(x, y)) { 
                game.ctx.fillStyle = "white";
                game.ctx.strokeStyle = game.star.color(x, y);
                game.ctx.lineWidth = 5;
                game.ctx.beginPath();
                game.ctx.arc(
                  x * tile.width - game.player.x * tile.width + tile.width / 2 + window.innerWidth / 2,
                  y * tile.height - game.player.y * tile.height + tile.height / 2 + window.innerHeight / 2,
                  game.star.size(x, y), //star size
                  0,
                  2 * Math.PI
                );
                game.ctx.fill();
                game.ctx.stroke();
                game.ctx.closePath();
              }
            }
          }
        }
      }
    },
    update: function () {

    },
    StarSystem: function (x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      this.x = x;
      this.y = y;
      this.name = game.galaxy.starName(x, y);
      this.planets = game.galaxy.planets(x, y);
    },
    debug: null,
    starName: function(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      if(this.starAt(x, y)) {
        var syllable = {
          min: 2,
          max: 5,
          words: [
            "lo", "fa", "for", "mat", "at", "ab", "ba", "co", "ca", "ap", "ck", 
            "to", "pe", "qu", "ir", "ko", "x", "zo", "zeo", "pla", "mn", "mo", 
            "do", "da", "plo", "ch", "io", "z", "dron", "al"
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
    planetCount: function(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      if(this.starAt(x, y)) {
        return game.math.pRand(x, y, 1, 12);
      } else { return false }
    }
  };