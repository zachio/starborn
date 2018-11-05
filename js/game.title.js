var game = game || {};

game.title = {
  draw: function() {
    var center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    game.ctx.font = "150px Orbitron";
    game.ctx.textAlign = "center";
    game.ctx.fillText("StarBorn",center.x, center.y);
    game.ctx.font = "50px Orbitron";
    game.ctx.fillText("Press Spacebar",center.x, center.y + 150);
  }  
};