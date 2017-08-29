var game = game || {};

game.chunk = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    update: function() {
        //No dividing by zero
        if(game.player.x || game.player.y) {
            //~~ this is like Math.floor but faster
            this.x = ~~(game.player.x / this.width);
            this.y = ~~(game.player.y / this.height);
        }
        
    }
  };