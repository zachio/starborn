var game = game || {};

game.player = {
    x: 1,
    y: -1,
    galaxy: {
      x: 0,
      y: -1
    },
    angle: 0,
    speed: {
      current: 0,
      max: 0.01,
      accelerate: 0.0001
    },
    size: 32,
    thrust: {
      flicker: true
    },
    update: function () {
      if(game.view == "star") {
        game.player.x += this.speed.current * Math.sin(this.angle);
        game.player.y -= this.speed.current * Math.cos(this.angle);
        if(this.speed.current < 0) {
          this.speed.current = 0;
        }
      }
      
      if(game.controls.up) {
        switch(game.view) {
          case "title":
            break;
          case "star":
            if(this.speed.current < this.speed.max) {
              this.speed.current += this.speed.accelerate;
            }
            break;
          case "galaxy":
            game.player.y -= game.player.speed.max;
            break;
        }
      } else {
        if(game.view == "star" && this.speed.current > 0) {
            this.speed.current -= this.speed.accelerate;
        }
      }
      if(game.controls.right) {
        switch(game.view) {
          case "star":
            if(game.view == "star") {
              this.angle += this.speed.max;
            }
            break;
          case "galaxy":
            this.x += this.speed.max;
            break;
        }
        
      }
      if(game.controls.down) {
        switch(game.view) {
          case "star":
            game.player.x -= this.speed.current * Math.sin(this.angle);
            game.player.y += this.speed.current * Math.cos(this.angle);
            break;
          case "galaxy":
            game.player.y += game.player.speed.max;
            break;
        }
      }
      if(game.controls.left) {
        switch(game.view) {
          case "star":
            game.player.angle -= game.player.speed.max;
            break;
          case "galaxy":
            game.player.x -= game.player.speed.max;
            break;
        }
      }
      game.tile.x = Math.floor(game.player.x);
      game.tile.y = Math.floor(game.player.y);
      game.chunk.x = Math.floor(game.player.x / game.chunk.width);
      game.chunk.y = Math.floor(game.player.y / game.chunk.height);
      if(game.view == "galaxy") {
        game.player.galaxy.x = game.player.x;
        game.player.galaxy.y = game.player.y;
      }
      
      if(game.view == "star") {
        //Thrust animation state
        if(this.thrust.flicker) {
          this.thrust.flicker = false;
        } else {
          this.thrust.flicker = true;
        }
      }
    },
    radar: {
      offset: -30,
      size: 5,
      draw: function() {
        var player = game.player;
        var center = {
          x: window.innerWidth / 2 + game.tile.width, 
          y: window.innerHeight / 2 + game.tile.height
        };
        var offset = 1.57;
        
        for(var i = 0; i < game.star.planet.total(player.galaxy.x, player.galaxy.y); i++) {
          var position = game.star.planet.position(player.galaxy.x, player.galaxy.y, i);
          
          var color = game.star.planet.color(position.x, position.y);
          //Creating the angle to point the arrow the right direction 
          //and using an offset to rotate the graphic the correct angle
          
          var angle = game.math.angle(game.player.x, game.player.y, position.x, position.y) + offset;
          
          game.ctx.save();
          game.ctx.translate(center.x + this.offset, center.y + this.offset);
          game.ctx.rotate(angle);
          game.ctx.beginPath();
          game.ctx.moveTo(0, this.offset);
          game.ctx.lineTo(this.size, this.offset + this.size);
          game.ctx.lineTo(-this.size, this.offset + this.size);
          game.ctx.fillStyle = color.hue;
          game.ctx.fill();
          game.ctx.closePath();
          game.ctx.restore();
        }
        //Radar for sun
        //suns position relative to the player
        
        var sunPosition = game.math.position(0, 0);
        var angle = game.math.angle(game.player.x, game.player.y, 0, 0) + offset;
        game.ctx.save();
        game.ctx.translate(center.x + this.offset, center.y + this.offset);
        game.ctx.rotate(angle);
        game.ctx.beginPath();
        game.ctx.moveTo(0 * game.getScale(), this.offset);
        game.ctx.lineTo(this.size, this.offset + this.size);
        game.ctx.lineTo(-this.size, this.offset + this.size);
        game.ctx.fillStyle = game.star.color(player.galaxy.x, player.galaxy.y);
        game.ctx.fill();
        game.ctx.closePath();
        game.ctx.restore();
      }
    },
    draw: function () {
      if(game.view == "star") {
        //Save canvas state and rotate ship
        game.ctx.save();
        game.ctx.translate(
          window.innerWidth / 2 + game.tile.width / 2 - this.size / 2, 
          window.innerHeight / 2 + game.tile.height / 2 - this.size / 2);
        game.ctx.rotate(this.angle);
        
        //Draw hull
        game.ctx.beginPath();
        game.ctx.moveTo(0, -this.size / 2);
        game.ctx.lineTo(this.size / 2, this.size / 2);
        game.ctx.lineTo(-this.size / 2, this.size / 2);
        game.ctx.closePath();
        game.ctx.fillStyle = "grey";
        game.ctx.fill();
        
        //Draw window
        var windowsize = this.size / 8;
        game.ctx.beginPath();
        game.ctx.moveTo(0, 0);
        game.ctx.lineTo(windowsize, windowsize);
        game.ctx.lineTo(-windowsize, windowsize);
        game.ctx.closePath();
        game.ctx.fillStyle = "cyan";
        game.ctx.fill();
        
        //Draw thrust
        if(game.controls.up) {
          var thrust = {
            x: 0,
            y: this.size / 2,
            size: this.size / 2 
          };
          
          game.ctx.beginPath();
          if (this.thrust.flicker == false) thrust.y = thrust.y + 5; 
          game.ctx.arc(thrust.x, thrust.y, thrust.size, 0, 2 * Math.PI, false);
          game.ctx.closePath();
          var gradient = game.ctx.createRadialGradient(thrust.x, thrust.y, 0, thrust.x, thrust.y, thrust.size);
          gradient.addColorStop(0, "rgb(0, 246, 255)");
          if(this.thrust.flicker) {
            gradient.addColorStop(0.25, "rgb(0, 246, 255)");
          } 
          gradient.addColorStop(1, "rgba(0, 246, 255,0)");
          game.ctx.fillStyle = gradient;
          game.ctx.fill();
        }
        
        game.ctx.restore();
        
      } else {
        game.ctx.lineWidth = 1;
        game.ctx.beginPath();
        game.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 20, 0, 2 * Math.PI, false);
        game.ctx.strokeStyle = "cyan";
        game.ctx.stroke();
        game.ctx.closePath();
        game.ctx.beginPath();
        game.ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 1, 0, 2 * Math.PI, false);
        game.ctx.fillStyle = "cyan";
        game.ctx.fill();
        game.ctx.closePath();
      }
    }
  };