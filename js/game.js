var game = game || {
  canvas: document.createElement('canvas'),
  tile: {
    id: 0,
    width: 32,
    height: 32,
    Tile: function (x, y) {
      this.x = x;
      this.y = y;
      this.id = game.galaxy.idAt(x, y);
      if(game.math.random(this.id) < 0.1) {
        this.isStar = true;
      } else {
        this.isStar = false;
      }
    }
  },
  ctx: null,
  draw: function () {
    game.player.draw();
    game.debug.draw();
  },
  erase: function () {
    game.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
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
    this.load.scripts();
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

  },
  load: {
        total: {
          scripts: 0,
          sprites: 0,
          audio: 0
        },
        scripts: function () {
          if(game.config.scripts.length) {
            console.log("loading scripts...");
            for(var i = 0; i < game.config.scripts.length; i++) {
                var script = document.createElement("script");
                var src = game.config.scripts[i];
                script.setAttribute("src", src);
                script.addEventListener("load", function() {
                    game.load.total.scripts++;
                    if(game.load.total.scripts == game.config.scripts.length) {
                            game.load.sprites();
                            game.load.audio();
                            //perlin.js noise
                            /* global noise */
                            noise.seed(game.config.seed);
                    }
                    console.log(this.src.substring(this.src.lastIndexOf('/')+1) + " loaded...");
                });
                document.head.appendChild(script);
            }
          }
        },
        sprites: function () {
          if(game.config.sprites.length) {
            for(var i = 0; i < game.config.sprites.length; i++) {
             // game.config.sprites[i] = new game.graphics.Sprite(game.config.sprites[i]);
            }
          } else {
            game.loop();
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
  update: function () {
    game.galaxy.update();
    game.player.update();
    game.debug.fps.update();
  },


}
