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
    width: 256,
    height: 256,
    chunks: [],
    Chunk: function (x, y) {
      this.x = x;
      this.y = y;
      this.tiles = [];
      for(var x = this.x * game.chunk.width; x <  this.x * game.chunk.width + game.chunk.width / game.tile.width; x++) {
        this.tiles[x] = [];
        for(var y = this.y * game.chunk.height; y < this.y * game.chunk.height + game.chunk.height / game.tile.height; y++) {
          this.tiles[x][y] = new game.tile.Tile(x,y);
        }
      }
    }
  },
  tile: {
    x: 0,
    y: 0,
    id: 0,
    width: 32,
    height: 32,
    Tile: function (x, y) {
      this.x = x;
      this.y = y;
      this.id = game.universe.idAt(x, y);
      if(game.math.random(this.id) < 0.1) {
        this.isStar = true;
      } else {
        this.isStar = false;
      }
    }
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
    drawX: 0,
    drawY: 0,
    count: 0,
    log: function (message) {
      game.ctx.fillText(message, 40, this.linePosition);
      this.linePosition += 20;
    },
    drawGrid3: function () {
      game.ctx.beginPath();
      for(var x = game.player.x - window.innerWidth / game.tile.width / 2 - 1; x < game.player.x + game.grid.width / 2 + 1; x++) {
        for(var y = game.player.y - window.innerHeight / game.tile.height / 2 - 1; y < game.player.y + game.grid.height / 2 + 1; y++) {
          game.debug.count++;
          let valuex = -x * game.tile.width + game.tile.width * Math.floor((game.grid.width - 1) / 2 + game.player.x);
          let valuey = -y * game.tile.height + game.tile.height * Math.floor((game.grid.height - 1) / 2 + game.player.y);
          let value = (noise.simplex2(valuex,valuey) * 255).toFixed();;
          let rgb = "rgb("+value+","+value+","+value+")";
          // console.log(rgb);
          // debugger;
          game.ctx.fillStyle = rgb;
          // console.log(rgb);
          // debugger;
          game.ctx.fillRect(
            -x * game.tile.width + game.tile.width * Math.floor((game.grid.width - 1) / 2 + game.player.x),
            -y * game.tile.height + game.tile.height * Math.floor((game.grid.height - 1) / 2 + game.player.y),
            game.tile.width, game.tile.height);
        }
      }
      game.ctx.closePath();
      game.ctx.strokeStyle = "red";
      game.ctx.stroke();
    },
    drawLog: function () {
      game.ctx.fillStyle = this.background;
      game.ctx.fillRect(20, 20, 200, 250);
      game.ctx.fillStyle = this.textColor;
      this.linePosition = 40;
      this.log("player.x: " + game.player.x);
      this.log("player.y: " + game.player.y);
      this.log("noise value: " + noise.simplex2(Math.floor(game.player.x), Math.floor(game.player.y)));
      this.log("tile.x: " + game.tile.x);
      this.log("tile.y: " + game.tile.y);
      this.log("tile.id: " + game.tile.id);
      this.log("FPS: " + game.fps.rate);
      this.log("Star: " + game.universe.starAt(Math.floor(game.player.x), Math.floor(game.player.y)));
      this.log("loop Count: " + this.count);
    },
    draw: function () {


      //Draw tile boxes
      game.debug.count = 0;
      this.drawGrid3();
      this.drawLog();

      // Draw player position
      game.player.draw();
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
  grid: {
    width: 0,
    height: 0
  },
  init: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.grid.width = Math.ceil(window.innerWidth / this.tile.width);
    this.grid.height = Math.ceil(window.innerHeight / this.tile.height);
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
      game.grid.width = Math.ceil(window.innerWidth / game.tile.width);
      game.grid.height = Math.ceil(window.innerHeight / game.tile.height);
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

    //perlin.js noise
    noise.seed(Math.random());

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
    },
    random2: function (seed) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);

    }
  },
  player: {
    x: 22,
    y: 0,
    speed: 0.1,
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
      game.tile.x = Math.floor(game.player.x);
      game.tile.y = Math.floor(game.player.y);
      game.chunk.x = Math.floor(game.player.x / game.chunk.width);
      game.chunk.y = Math.floor(game.player.y / game.chunk.height);

    },
    draw: function () {
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
  universe: {
    width: 65535,
    height: 65535,
    idAt: function (x, y) {
      var id = y * this.width + x;
      //console.log("Tile ID is " + id);
      return id;
    },
    starAt: function (x, y) {
      if(game.math.random(this.idAt(x,y)) > 0.9) {
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

      for(var x = (game.chunk.x - 1 >= 0) ? game.chunk.x - 1: 0; x < game.chunk.x + 1; x++) {
        if(typeof game.chunk.chunks[x] == 'undefined') {
          game.chunk.chunks[x] = [];
        }
        for(var y = (game.chunk.y - 1 >= 0) ? game.chunk.y - 1: 0; y < game.chunk.y + 1; y++) {
          if(typeof game.chunk.chunks[x][y] == 'undefined') {
            game.chunk.chunks[x][y] = new game.chunk.Chunk(x,y);
          }
        }
      }
      game.tile.id = this.idAt(Math.floor(game.player.x), Math.floor(game.player.y));
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
