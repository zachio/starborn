var game = game || {};

game.debug = {
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
    drawLog: function () {
      game.ctx.fillStyle = this.background;
      game.ctx.fillRect(20, 20, 200, 250);
      game.ctx.fillStyle = this.textColor;
      this.linePosition = 40;
      let x = Math.floor(game.player.x);
      let y = Math.floor(game.player.y);
      this.log("player.x: " + x);
      this.log("player.y: " + y);
      this.log("chunk.x: " + game.chunk.x);
      this.log("chunk.y: " + game.chunk.y);
      /* global noise */
      this.log("noise value: " + noise.simplex2(x, y));
      this.log("FPS: " + game.debug.fps.rate);
      this.log("Star Name: " + game.galaxy.starName(x, y));
      this.log("total planets: " + game.galaxy.planetCount(x, y));
      this.log("total scripts: " + game.load.total.scripts);
    },
    drawGrid: function(){
        
        //Chunks are drawn 4 x 4
        for(var chunkX = game.chunk.x - 2; chunkX <= game.chunk.x + 2; chunkX++ ) {
          for(var chunkY = game.chunk.y - 2; chunkY <= game.chunk.y + 2; chunkY++) {
            game.ctx.strokeStyle = "red";
            for(var x = chunkX * game.chunk.width; x < game.chunk.width * chunkX + game.chunk.width; x++) {
              for(var y = chunkY * game.chunk.height; y < game.chunk.height * chunkY + game.chunk.height; y++) {
                if (game.galaxy.starAt(x, y)) { 
                  game.ctx.fillStyle = "white";
                  game.ctx.fillRect (
                      x * game.tile.width - game.player.x * game.tile.width + window.innerWidth / 2,
                      y * game.tile.height - game.player.y * game.tile.height + window.innerHeight / 2,
                      game.tile.width,
                      game.tile.height
                  );
                } else { 
                  game.ctx.strokeRect(
                      x * game.tile.width - game.player.x * game.tile.width + window.innerWidth / 2,
                      y * game.tile.height - game.player.y * game.tile.height + window.innerHeight / 2,
                      game.tile.width,
                      game.tile.height
                  );
                }
              }
            }
            //draw chunk
            game.ctx.strokeStyle = "green";
            game.ctx.strokeRect(
              chunkX * game.chunk.width * game.tile.width - game.player.x *  game.tile.width + window.innerWidth / 2,
              chunkY * game.chunk.height * game.tile.height - game.player.y * game.tile.height  + window.innerHeight / 2,
              game.tile.width * game.chunk.width,
              game.tile.height * game.chunk.height
            );
          }
        }
        
        
    },
    draw: function () {
      this.drawGrid();
      this.drawLog();
      // Draw player position
      game.player.draw();
    },
    fps: {
      currentTime: 0,
    	lastTime: 0,
      rate: 50,
    	timePerTick: 17,
    	updateTime: Date.now(), //This sets a time stamp every second to update the game.debug.fps
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
    }
  }