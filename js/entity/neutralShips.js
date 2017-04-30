class neutralShips extends Phaser.Sprite {
    constructor(game, x, y, key, keel, health) {
        super(game, x, y, key, keel, health);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.neutralShipHealth = health;
        this.neutralShipKeel = keel;
        console.log(key + ' neutral ship spawned! Health is: ' + this.neutralShipHealth + ' Keel is: ' + this.neutralShipKeel);
        this.roll = 125;
        this.scale.setTo(-1, 1);
        //this.tint = 0x242424; <-tint for being dead
        //this.tint = 0x4a0707; //<-Tint for taking damage


    }

    _damageTaken(damage){
        
    }
    update() {
        this.roll += 0.2;
        this.y = 2 * Math.sin(this.roll / 4) + this.neutralShipKeel;


    }
}