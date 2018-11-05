var game = game || {};

game.load = {
        total: {
          scripts: 0,
          sprites: 0,
          audio: 0
        },
        scripts: function () {
          console.log("loading config script...");
          var script = document.createElement("script");
          script.setAttribute("src", "js/game.config.js");
          document.head.appendChild(script);
          script.addEventListener("load", function(){
            console.log(this.src.substring(this.src.lastIndexOf('/')+1) + " loaded...");
            if(game.config.scripts.length) {
            console.log("loading game scripts...");
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
          });
          
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
            var eluvium = game.config.audio[0];
            var audio = document.createElement("audio");
            audio.setAttribute("type", "audio/mpeg");
            audio.setAttribute("src", eluvium); 
            audio.addEventListener("load", function(){
              audio.play();
            });
          }
        }
    };