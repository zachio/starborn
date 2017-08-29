var game = game || {};

game.chunk = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    chunks: [],
    Chunk: function (x, y) {
      this.x = x;
      this.y = y;
      this.tiles = [];
      for(let x = this.x * game.chunk.width; x <  this.x * game.chunk.width + game.chunk.width / game.tile.width; x++) {
        this.tiles[x] = [];
        for(let y = this.y * game.chunk.height; y < this.y * game.chunk.height + game.chunk.height / game.tile.height; y++) {
          this.tiles[x][y] = new game.tile.Tile(x,y);
        }
      }
    }
  };