var game = game || {};

game.star = {
    color: function(x, y) {
      x = Math.floor(x);
      y = Math.floor(y);
      if(game.galaxy.starAt(x, y)) {
          y = Math.abs(y);
          var r = game.math.pRand(x, y, 0, 255);
          var g = game.math.pRand(x+x, y, 0, 255);
          var b = game.math.pRand(x, y+y, 0, 255);
          return "rgb("+r+","+g+","+b+")";
      } else { return false }
    },
    map: {
      width: 100,
      height: 100,
    },
    draw: {
      sun: function() {
        var x = -game.player.x * game.tile.width + game.tile.width / 2 + window.innerWidth / 2;
        var y = -game.player.y * game.tile.height + game.tile.height / 2 + window.innerHeight / 2;
        var size = 10 * game.star.size(game.player.galaxy.x, game.player.galaxy.y);
        var color = game.star.color(game.player.galaxy.x, game.player.galaxy.y);
        var gradient = game.ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.7, "white");
        gradient.addColorStop(0.8, color);
        gradient.addColorStop(1, "transparent");
        game.ctx.fillStyle = gradient;
        
        //Only draw when sun is in window view
        if(x > -size && x < window.innerWidth + size && y > -size && y < window.innerHeight + size) {
          game.ctx.beginPath();
          game.ctx.arc(
            x, y,
            size, //star size
            0,
            2 * Math.PI
          );
          game.ctx.fill();
          game.ctx.closePath();
        }
        
      },
      planets: function() {
        for(var i = 0; i < game.galaxy.planetCount(game.player.galaxy.x, game.player.galaxy.y); i++) {
          var position = game.star.planet.position(game.player.galaxy.x, game.player.galaxy.y, i);
          var x = -game.player.x * game.tile.width + position.x * game.tile.width + game.tile.width / 2 + window.innerWidth / 2;
          var y = -game.player.y * game.tile.height + position.y * game.tile.height + game.tile.height / 2 + window.innerHeight / 2;
          var size = game.star.planet.size(game.player.galaxy.x, game.player.galaxy.y, i);
          var color = game.star.planet.color(position.x, position.y);
          game.ctx.fillStyle = color;
          
          //Only draw when planets are in window view
          if(x > -size && x < window.innerWidth + size && y > -size && y < window.innerHeight + size) {
            game.ctx.beginPath();
            game.ctx.arc(
              x, y, size, //planet size
              0,
              2 * Math.PI
            );
            game.ctx.fill();
            game.ctx.closePath();
          }
        }
      },
    },
    size: function(x, y) {
      if(game.galaxy.starAt(x, y)) {
        x = Math.floor(x);
        y = Math.floor(y);
        return game.math.pRand(x, y, 5, 10);
      } else {
        return false;
      }
    },
    planet: {
      position: function(x, y, num) {
        x = Math.floor(x);
        y = Math.floor(y);
        x = game.math.pRand(x + num, y, -25, 25);
        y = game.math.pRand(x, y + num, -25, 25);
        return {x: x, y: y};
      },
      size: function(x, y, num) {
        var size = game.math.pRand(x + num, y + num, 20, 40);
        return size;
      },
      color: function(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);

        var r = game.math.pRand(x, y, 0, 255);
        var g = game.math.pRand(x+x, y, 0, 255);
        var b = game.math.pRand(x, y+y, 0, 255);
        return "rgb("+r+","+g+","+b+")";

      }
    }
};