var game = game || {
  canvas: document.createElement('canvas'),
  chunk: {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
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
