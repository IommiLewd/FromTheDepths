class neutralShips extends Phaser.Sprite {
    constructor(game, x, y, key, type) {
        super(game, x, y, key, type);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        console.log(type);
        if (type === undefined) {
            var randomType = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            console.log(randomType);
            console.log('randomType');
        }

        this.neutralShipArray = [
         //0 - key, 1 - keel depth, 2 - health

          ['oilTanker', 105, 620],
          ['hauler', 105, 420],
          ['largeHauler', 105, 550],
        ];
        console.log('NeutralShip Spawned');
        this.roll = 125;
        this.scale.setTo(-1, 1);
        //this.tint = 0x242424; <-tint for being dead
        //this.tint = 0x4a0707; //<-Tint for taking damage


    }


    update() {
        this.roll += 0.2;
        this.y = 2 * Math.sin(this.roll / 4) + 105;


    }
}