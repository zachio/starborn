var game = game || {};

game.controls = {
    up: false,
    right: false,
    down: false,
    left: false,
    map: function() {
      if(game.view == "star") {
        game.player.x = game.player.galaxy.x;
        game.player.y = game.player.galaxy.y;
        game.view = "galaxy";
      }
    },
    action: function() {
      if(game.view == "galaxy" && game.galaxy.starAt(Math.floor(game.player.x), Math.floor(game.player.y))) {
        game.player.galaxy.x = game.player.x;
        game.player.galaxy.y = game.player.y;
        game.player.x = 0;
        game.player.y = 0;
        game.view = "star";
      }
    }
};

window.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 38: // up
    case 87: // w
      game.controls.up = true;
      break;
    case 39: // right
    case 68: // d
      game.controls.right = true;
      break;
    case 40: // down
    case 83: // s
      game.controls.down = true;
      break;
    case 37: // left
    case 65: // a
      game.controls.left = true;
      break;
    case 32: //spacebar action
      game.controls.action();
      break;
    case 77: // m map
      game.controls.map();
      break;
  }
});
window.addEventListener('keyup', function() {
  switch(event.keyCode) {
    case 38: // up
    case 87: // w
      game.controls.up = false;
      break;
    case 39: // right
    case 68: // d
      game.controls.right = false;
      break;
    case 40: // down
    case 83: // s
      game.controls.down = false;
      break;
    case 37: // left
    case 65: // a
      game.controls.left = false;
      break;
  }
});