var game = game || {};

game.load = {
        total: {
          scripts: 0,
          sprites: 0,
          audio: 0
        },
        scripts: function () {
          if(game.config.scripts.length) {
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
                            noise.seed(game.config.seed);
                    }
                    console.log(this.src.substring(url.lastIndexOf('/')+1) + " loaded...");
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
    };