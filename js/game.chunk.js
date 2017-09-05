var game = game || {};

game.chunk = {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    cache: [
        []
    ],
    update: function() {
        if (game.player.x || game.player.y) {
            //~~ this is like Math.floor but faster
            this.x = ~~(game.player.x * (1 / this.width));
            this.y = ~~(game.player.y * (1 / this.height));
        }
        //Chunks are drawn 4 x 4
        // for (var chunkX = this.x - 2; chunkX <= this.x + 2; 
        // chunkX++) {
        //     for (var chunkY = this.y - 2; chunkY <= this.y + 2; 
        //     chunkY++) {
        //         if (!this.cached(chunkX, chunkY)) {
        //             for (var x = chunkX * this.width; x < 
        //             this.width * chunkX + this.width; x++) {
        //                 for (var y = chunkY * this.height; y < 
        //                 this.height * chunkY + this.height; y++) {
                            
        //                 }
        //             }
        //         }
        //     }
        // }

    },
    cached: function(x, y) {
        if (typeof this.cache[x] == "undefined") {
            if (typeof this.cache[x][y] == "undefined") {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
};