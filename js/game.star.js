var game = game || {};

game.star = {
    background: {
      stars: [],
      init: function() {
        
      },
      randomLayer: function() {
        var random = game.math.random;
        var i, n = random.range(1, 100);
        for(i = 0 ; i < this.layers.length ; i++) {
          if (n <= this.layers[i].percent) {
            console.log(this.layers[i]);
            return this.layers[i];
          }
            
        }
      },
      draw: function() {
        var ctx = game.ctx;
        var star, n;
        for(n = 0 ; n < this.stars.length ; n++) {
          star = this.stars[n];
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, 2*Math.PI, true);
          ctx.fill();
          ctx.closePath();
        }
      },
      update: function() {
        var start  = Game.timestamp(); this.update((start - this.lastFrame)/1000.0); // send dt as seconds
        var middle = Game.timestamp(); this.draw();
        var end    = Game.timestamp();
        this.updateStats(middle - start, end - middle);
        this.lastFrame = start;
      },
      initLayers: function(layers) {
        var n, sum = 0, l;
        for(n = 0 ; n < layers.length ; n++) {
          l = layers[n];
          l.min = sum;
          l.max = sum + l.percent;
          sum = l.max;
        }
        this.layers = layers;
      },
      layers: [
        { percent:  30, size: { min: 0.4, max: 1.0 }, speed: { min:   1, max:   2 }, colors: ['#111', '#111', '#811'] }, // 1 in 3 get a tint of red
        { percent:  25, size: { min: 0.6, max: 1.2 }, speed: { min:   2, max:   4 }, colors: ['#333', '#333', '#833'] }, // 1 in 3 get a tint of red
        { percent:  15, size: { min: 0.8, max: 1.4 }, speed: { min:   4, max:   8 }, colors: ['#555', '#555', '#855'] }, // 1 in 3 get a tint of red
        { percent:  15, size: { min: 1.0, max: 1.6 }, speed: { min:   8, max:  16 }, colors: ['#777'] },
        { percent:   8, size: { min: 1.2, max: 1.8 }, speed: { min:  16, max:  32 }, colors: ['#999'] },
        { percent:   4, size: { min: 1.4, max: 2.0 }, speed: { min:  32, max:  64 }, colors: ['#BBB'] },
        { percent:   2, size: { min: 1.6, max: 2.2 }, speed: { min:  64, max: 128 }, colors: ['#DDD'] },
        { percent:   1, size: { min: 1.8, max: 2.4 }, speed: { min: 128, max: 256 }, colors: ['#FFF'] }
      ]
    },
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
      height: 100
    },
    scale: 100,
    draw: {
      sun: function() {
        var scale = game.getScale();
        var tile = {
          width: game.tile.width * scale,
          height: game.tile.height * scale
        };
        var x = -game.player.x * tile.width + tile.width / 2 + window.innerWidth / 2;
        var y = -game.player.y * tile.height + tile.height / 2 + window.innerHeight / 2;
        var size = game.star.size(game.player.galaxy.x, game.player.galaxy.y);
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
        var scale = game.getScale();
        var tile = {
          width: game.tile.width * scale,
          height: game.tile.height * scale
        };
        for(var i = 0; i < game.galaxy.planetCount(game.player.galaxy.x, game.player.galaxy.y); i++) {
          var position = game.star.planet.position(game.player.galaxy.x, game.player.galaxy.y, i);
          var x = -game.player.x * tile.width + position.x * tile.width + tile.width / 2 + window.innerWidth / 2;
          var y = -game.player.y * tile.height + position.y * tile.height + tile.height / 2 + window.innerHeight / 2;
          var size = game.star.planet.size(game.player.galaxy.x, game.player.galaxy.y, i);
          var color = game.star.planet.color(position.x, position.y);
          var gradient = game.ctx.createRadialGradient(x, y, 0, x, y, size);
          gradient.addColorStop(0, color.highlight);
          gradient.addColorStop(1, color.hue);
          
          //Only draw when planets are in window view
          if(x > -size && x < window.innerWidth + size && y > -size && y < window.innerHeight + size) {
            game.ctx.beginPath();
            game.ctx.arc(
              x, y, size, //planet size
              0,
              2 * Math.PI
            );
            game.ctx.fillStyle = gradient;
            game.ctx.fill();
            game.ctx.closePath();
          }
        }
      },
    },
    size: function(x, y) {
      var scale = game.getScale();
      if(game.galaxy.starAt(x, y)) {
        x = Math.floor(x);
        y = Math.floor(y);
        //Returns star radius and maxes at tile size
        var size = game.math.pRand(x, y, game.tile.width / 4, game.tile.width / 2) * scale;
        return size;
      } else {
        return false;
      }
    },
    planet: {
      position: function(x, y, num) {
        var map = game.star.map;
        x = Math.floor(x);
        y = Math.floor(y);
        x = game.math.pRand(x + num, y, -map.width / 2, map.width / 2);
        y = game.math.pRand(x, y + num, -map.width / 2, map.width / 2);
        return {x: x, y: y};
      },
      size: function(x, y, num) {
        var scale = game.getScale();
        var size = game.math.pRand(x + num, y + num, game.tile.width / 4, game.tile.width / 2) * scale;
        return size;
      },
      color: function(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);

        var r = game.math.pRand(x, y, 0, 255);
        var g = game.math.pRand(x+x, y, 0, 255);
        var b = game.math.pRand(x, y+y, 0, 255);
        var hlr = r + 25 <= 255 ? r + 25 : 255;
        var hlg = g + 25 <= 255 ? g + 25 : 255;
        var hlb = b + 25 <= 255 ? b + 25 : 255;
        return {
          hue: "rgb("+r+","+g+","+b+")",
          highlight: "rgb("+hlr+","+hlg+","+hlb+")"
        };

      },
      total: function(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if(game.galaxy.starAt(x, y)) {
          return game.math.pRand(x, y, 1, 12);
        } else { return false }
      }
    }
};