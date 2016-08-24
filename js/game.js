var game = game || {
  assets: {
    mods: [],
    sprites: [],
    audio: []
  },
  canvas: document.createElement('canvas'),
  chunk: {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    Chunk: function (x, y) {
      this.x = x;
      this.y = y;
      this.seed = 0;
      this.starCount = Math.floor(game.math.random(this.seed) * 5 + 1);
    },
    chunks: []
  },
  ctx: null,
  config: {
    mods: [],
    sprites: [
      'img/space.jpg'
    ],
    audio: []
  },
  controls: {
    up: false,
    right: false,
    down: false,
    left: false
  },
  draw: function () {
    // game.universe.draw();
    game.player.draw();
    game.debug.draw();
  },
  debug: {
    background: "rgba(0,0,0,0.9)",
    textColor: "white",
    linePosition: 40,
    log: function (message) {
      game.ctx.fillText(message, 40, this.linePosition);
      this.linePosition += 20;
    },
    draw: function () {
      game.ctx.fillStyle = this.background;
      game.ctx.fillRect(20, 20, 200, 250);
      game.ctx.fillStyle = this.textColor;
      this.linePosition = 40;
      this.log("player.x: " + game.player.x);
      this.log("player.y: " + game.player.y);
      this.log("chunk.x: " + game.chunk.x);
      this.log("chunk.y: " + game.chunk.y);
      this.log("FPS: " + game.fps.rate);
      //Draw tile boxes
      /*
      for(var x = game.chunk.x - 2; x < game.chunk.x + 2; x++) {
        for(var y = game.chunk.y - 2; y < game.chunk.y + 2; y++) {
          for(var tileX = game.chunk.width * game.tile.width * x; tileX < game.chunk.width * game.tile.width * x * 2; tileX++) {
            for(var tileY = game.chunk.height * game.tile.height * y; tileY < game.chunk.height * y * 2; tileY++) {
              game.ctx.save();
              game.ctx.translate(window.innerWidth / 2 - game.player.x, window.innerHeight / 2 - game.player.y);
              game.ctx.strokeStyle = "blue";
              game.ctx.strokeRect(game.tile.width * tileX, game.tile.height * tileY , game.tile.width, game.tile.height);
              game.ctx.restore();
            }
          }
        }
      }*/

      // Draw chunk outlines

      for(var x = game.chunk.x - 2; x < game.chunk.x + 2; x++) {
        for(var y = game.chunk.y - 2; y < game.chunk.y + 2; y++) {
          game.ctx.save();
          game.ctx.translate(window.innerWidth / 2 - game.player.x, window.innerHeight / 2 - game.player.y);
          game.ctx.strokeStyle = "red";
          game.ctx.strokeRect(game.chunk.width * game.tile.width * x, game.chunk.height * game.tile.height *  y, game.chunk.width * game.tile.width, game.chunk.height * game.tile.height);
          game.ctx.fillStyle = "red";
          game.ctx.font = "30px Arial";
          game.ctx.fillText(x + ", " + y, game.chunk.width * game.tile.width * x + 25, game.chunk.height * game.tile.height * y + 50);
          game.ctx.restore();
        }
      }

      // Draw player position
      game.ctx.beginPath();
      game.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 20, 0, 2 * Math.PI, false);
      game.ctx.strokeStyle = "red";
      game.ctx.stroke();
      game.ctx.closePath();
      game.ctx.beginPath();
      game.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 1, 0, 2 * Math.PI, false);
      game.ctx.fillStyle = "red";
      game.ctx.fill();
      game.ctx.closePath();

    }
  },
  erase: function () {
    game.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
  },
  fps: {
    currentTime: 0,
  	lastTime: 0,
    rate: 50,
  	timePerTick: 17,
  	updateTime: Date.now(), //This sets a time stamp every second to update the Game.fps
  	get: function(currentTime, lastTime) {
  		var fps = 1000 / (this.currentTime - this.lastTime);
  		return fps.toFixed();
  	},
  	update: function() {
  		this.currentTime = Date.now();
  		if(this.currentTime - this.updateTime >= 1000) {
  			this.rate = this.get(this.currentTime, this.lastTime);
  			this.updateTime = this.currentTime;
  		}
  		this.timePerTick = this.currentTime - this.lastTime;
  		this.lastTime = this.currentTime;
  	}
  },

  init: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.background = "black";
    this.ctx = this.canvas.getContext('2d');
    this.load.mods();
    this.load.sprites()
    this.load.audio();
    window.addEventListener('load', function() {
      document.body.style.margin = 0;
      document.body.style.padding = 0;
      document.body.style.overflow = "hidden";
      document.body.appendChild(game.canvas);
    });
    window.addEventListener('resize', function() {
      game.canvas.width = window.innerWidth;
      game.canvas.height = window.innerHeight;
    });
    window.addEventListener('keydown', function(event) {
      switch(event.keyCode) {
        case 38: //up
          game.controls.up = true;
          break;
        case 39: //right
          game.controls.right = true;
          break;
        case 40: //down
          game.controls.down = true;
          break;
        case 37: //left
          game.controls.left = true;
          break;
      }
    });
    window.addEventListener('keyup', function() {
      switch(event.keyCode) {
        case 38: //up
          game.controls.up = false;
          break;
        case 39: //right
          game.controls.right = false;
          break;
        case 40: //down
          game.controls.down = false;
          break;
        case 37: //left
          game.controls.left = false;
          break;
      }
    });
  },
  load: {
    total: {
      mods: 0,
      sprites: 0,
      audio: 0
    },
    mods: function () {
      if(game.config.mods.length) {

      }
    },
    sprites: function () {
      if(game.config.sprites.length) {
        for(var i = 0; i < game.config.sprites.length; i++) {
          game.assets.sprites[i] = new game.Sprite(game.config.sprites[i]);
        }
      }
    },
    audio: function () {
      if(game.config.audio.length) {

      }
    }
  },
  loop: function() {
    game.erase();
    game.draw();
    game.update();
    requestAnimationFrame(game.loop);
  },
  math: {
    angleBetweenPoints: function (p1x, p1y, p2x, p2y) {
      return Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
    },
    random: function (seed) {
      if (!seed)
        seed = 0;
      seed = (seed*9301+49297) % 233280;
      return seed/(233280.0);
    }
  },
  player: {
    x: Number((window.innerWidth / 2).toFixed()),
    y: Number((window.innerHeight / 2).toFixed()),
    speed: 10,
    update: function () {
      if(game.controls.up) {
        game.player.y -= game.player.speed;
      }
      if(game.controls.right) {
        game.player.x += game.player.speed;
      }
      if(game.controls.down) {
        game.player.y += game.player.speed;
      }
      if(game.controls.left) {
        game.player.x -= game.player.speed;
      }
      game.chunk.x = (game.player.x) ? Math.floor(game.player.x / (game.chunk.width * game.tile.width)) : 0;
      game.chunk.y = (game.player.y) ? Math.floor(game.player.y / (game.chunk.height * game.tile.height)) : 0;

    },
    draw: function () {

    }
  },
  Sprite: function (file) {
    this.image = new Image();
    this.image.src = file;
    this.image.addEventListener('load', function() {
      game.load.total.sprites++;
      if(game.load.total.sprites == game.config.sprites.length &&
        game.load.total.mods == game.config.mods.length &&
        game.load.total.audio == game.config.audio.length
      ) {
        game.loop();
      }
    });

    game.assets.sprites.push(this);
  },
  tile: {
    width: 32,
    height: 32,
    id: 0
  },
  universe: {
    width: 65535,
    height: 65535,
    idAt: function (x, y) {
      var id = y * this.width + x;
      console.log("Tile ID is " + id);
    },
    draw: function () {
      for(var x = game.chunk.x - 2; x < game.chunk.x + 2; x++) {
        for(var y = game.chunk.y - 2; y < game.chunk.y + 2; y++) {
          game.ctx.save();
          game.ctx.translate(window.innerWidth / 2 - game.player.x, window.innerHeight / 2 - game.player.y);
          game.ctx.drawImage(game.assets.sprites[0].image, game.assets.sprites[0].image.width * x, game.assets.sprites[0].image.height * y);
          game.ctx.restore();
        }
      }
    },
    update: function () {
      for(var x = game.chunk.x - 2; x < game.chunk.x + 2; x++) {
        if(typeof game.chunk.chunks[x] == 'undefined') {
          game.chunk.chunks[x] = [];
        }
        for(var y = game.chunk.y - 2; y < game.chunk.y + 2; y++) {
          if(typeof game.chunk.chunks[x][y] == 'undefined') {
            game.chunk.chunks[x][y] = new game.chunk.Chunk(x,y);
          }
        }
      }
    },
    Star: function (x, y) {
      this.x = x;
      this.y = y;
    }
  },
  update: function () {
    game.universe.update();
    game.player.update();
    game.fps.update();
  },


}