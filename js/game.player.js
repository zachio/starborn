var game = game || {};

game.player = {
    x: 0,
    y: 0,
    galaxy: {
      x: 0,
      y: 0
    },
    speed: 0.1,
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
      game.tile.x = Math.floor(game.player.x);
      game.tile.y = Math.floor(game.player.y);
      game.chunk.x = Math.floor(game.player.x / game.chunk.width);
      game.chunk.y = Math.floor(game.player.y / game.chunk.height);
      if(game.view == "galaxy") {
        game.player.galaxy.x = game.player.x;
        game.player.galaxy.y = game.player.y;
      }
    },
    draw: function () {
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
  };