class neutralShips extends Phaser.Sprite {
    constructor(game, x, y,key, type) {
        super(game, x, y, key, type);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        console.log('NeutralShip Spawned');
        this.scale.setTo(-1, 1);

    }


    update() {










    }
}