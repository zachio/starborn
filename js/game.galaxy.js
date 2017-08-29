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
          game.ctx.translate(window.innerWidth / 2 - game.player.x, window.innerHeight / 2 - game.player.y);
          game.ctx.drawImage(game.assets.sprites[0].image, game.assets.sprites[0].image.width * x, game.assets.sprites[0].image.height * y);
          game.ctx.restore();
        }
      }
    },
    update: function () {

    },
    Star: function (x, y) {
      this.x = x;
      this.y = y;
    }
  };