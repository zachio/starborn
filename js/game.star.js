var game = game || {};

game.star = {
    color: function(x, y) {
        if(game.galaxy.starAt(x, y)) {
            y = Math.abs(y);
            var r = game.math.pRand(x, y, 0, 255);
            var g = game.math.pRand(x+x, y, 0, 255);
            var b = game.math.pRand(x, y+y, 0, 255);
            return "rgb("+r+","+g+","+b+")";
        } else { return false }
    },
    size: function(x, y) {
        if(game.galaxy.starAt(x, y)) {
            return game.math.pRand(x, y, 5, 10);
        } else {
            return false;
        }
    }
};