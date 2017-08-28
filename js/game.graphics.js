var game = game || {};

game.graphics = {
    Sprite: function (file) {
        this.image = new Image();
        this.image.src = file;
        this.image.addEventListener('load', function() {
          game.load.total.sprites++;
          if(game.load.total.sprites == game.config.sprites.length &&
            game.load.total.scripts == game.config.scripts.length &&
            game.load.total.audio == game.config.audio.length
          ) {
            game.loop();
          }
        });
    
        game.assets.sprites.push(this);
    }
};