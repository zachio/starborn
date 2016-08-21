var game = game || {
  assets: {
    mods: [],
    sprites: [],
    audio: []
  },
  canvas: document.createElement('canvas'),
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
    game.universe.draw();
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
      this.log("chunk.x: " + game.player.chunk.x);
      this.log("chunk.y: " + game.player.chunk.y);

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
  player: {
    x: (window.innerWidth / 2).toFixed(),
    y: (window.innerHeight / 2).toFixed(),
    chunk: {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    },
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
      game.player.chunk.x = (game.player.x) ? Math.floor(game.player.x / game.player.chunk.width) : 0;
      game.player.chunk.y = (game.player.y) ? Math.floor(game.player.y / game.player.chunk.height) : 0;

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
  universe: {
    draw: function () {
      for(var x = game.player.chunk.x - 2; x < game.player.chunk.x + 2; x++) {
        for(var y = game.player.chunk.y - 2; y < game.player.chunk.y + 2; y++) {
          game.ctx.save();
          game.ctx.translate(window.innerWidth / 2 - game.player.x, window.innerHeight / 2 - game.player.y);
          game.ctx.drawImage(game.assets.sprites[0].image, game.assets.sprites[0].image.width * x, game.assets.sprites[0].image.height * y);
          game.ctx.strokeStyle = "red";
          game.ctx.strokeRect(game.assets.sprites[0].image.width * x, game.assets.sprites[0].image.height * y , game.player.chunk.width, game.player.chunk.height);
          game.ctx.restore();
        }
      }
    }
  },
  update: function () {
    game.player.update();
    game.fps.update();
  },


}
