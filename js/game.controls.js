var game = game || {};

game.controls = {
    up: false,
    right: false,
    down: false,
    left: false
};

window.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 38: //up
      game.controls.up = true;
      break;
    case 39: //right
      game.controls.right = true;
      break;
    case 40: //down
      game.controls.down = true;
      break;
    case 37: //left
      game.controls.left = true;
      break;
  }
});
window.addEventListener('keyup', function() {
  switch(event.keyCode) {
    case 38: //up
      game.controls.up = false;
      break;
    case 39: //right
      game.controls.right = false;
      break;
    case 40: //down
      game.controls.down = false;
      break;
    case 37: //left
      game.controls.left = false;
      break;
  }
});