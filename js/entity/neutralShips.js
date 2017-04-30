class neutralShips extends Phaser.Sprite {
    constructor(game, x, y, key, keel, health) {
        super(game, x, y, key, keel, health);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.neutralShipHealth = health;
        this.neutralShipKeel = keel;
        this.neutralShipInitialHealth = health;
        console.log(key + ' neutral ship spawned! Health is: ' + this.neutralShipHealth + ' Keel is: ' + this.neutralShipKeel);
        this.roll = 115;
        this._fire();
        this._bubbles();
        this.scale.setTo(-1, 1);
        this.isAlive = true;
        this.outOfBoundsKill = true;
        console.log(this.width + 'is width');
        this.VariableMovement = Math.random() * (0.4 - 0.2 + 0.2) + 0.2;
        //this.tint = 0x242424; <-tint for being dead
        //this.tint = 0x4a0707; //<-Tint for taking damage


    }



    _bubbles() {
        this.bubbleEmitter = this.game.add.emitter(30, 0, 200);
        this.bubbleEmitter.makeParticles('bubble');
        this.bubbleEmitter.height = this.width;
        this.bubbleEmitter.maxParticleSpeed = new Phaser.Point(-60, 10);
        this.bubbleEmitter.minParticleSpeed = new Phaser.Point(-160, -10);
        this.bubbleEmitter.setRotation(0, 360);
        this.bubbleEmitter.setAlpha(0.8, 1.0, 300);
        this.bubbleEmitter.forEach(function (particle) {
            //            particle.body.allowGravity = false;
            particle.body.gravity.y = 130;


        }, this);
        this.bubbleEmitter.setScale(0.2, 1, 0.2, 1, 600);
        this.bubbleEmitter.start(false, 600, 90);
        this.bubbleEmitter.angle = 90;
        this.addChild(this.bubbleEmitter);
        this.bubbleEmitter.on = false;
    }









    _fire() {
        this.fireEmitter = this.game.add.emitter(0, 0, 200);
        this.fireEmitter.makeParticles('particles', [0, 1, 2, 3]);
        this.fireEmitter.height = this.width;
        this.fireEmitter.setSprite = 'bubbles';
        this.fireEmitter.maxParticleSpeed = new Phaser.Point(-60, 10);
        this.fireEmitter.minParticleSpeed = new Phaser.Point(-160, -10);
        this.fireEmitter.setRotation(0, 360);
        this.fireEmitter.setAlpha(0.8, 1.0, 300);
        this.fireEmitter.forEach(function (particle) {
            //            particle.body.allowGravity = false;
            particle.body.gravity.y = 130;


        }, this);
        this.fireEmitter.setScale(0.2, 1, 0.2, 1, 600);
        this.fireEmitter.start(false, 600, 130);
        this.fireEmitter.frame = 3;
        this.fireEmitter.angle = 90;
        this.addChild(this.fireEmitter);
        this.fireEmitter.on = false;
    }

    _damageTaken(damage) {
        console.log(this.neutralShipHealth + '<- Health Before impact');
        this.tint = 0x4a0707;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, function () {
            if (this.isAlive) {
                this.tint = 0xffffff;
            } else {
                this.tint = 0x242424;
            }

        }, this);

        this.neutralShipHealth -= damage;
        console.log(this.neutralShipHealth);
        if (this.neutralShipHealth < this.neutralShipInitialHealth * 3 / 4) {
            this.fireEmitter.on = true;
        }
        if (this.neutralShipHealth < this.neutralShipInitialHealth / 2) {
            this.fireEmitter.frequency = 30;
        }

        if (this.neutralShipHealth < 0) {
            this.isAlive = false;
            this.fireEmitter.on = false;
            


        }

    }
    update() {
        if (this.isAlive) {
            this.body.velocity.x = 0;
            this.roll += this.VariableMovement;
            this.y = 2 * Math.sin(this.roll / 4) + this.neutralShipKeel;
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 12;
            if (this.angle < 40) {
                this.angle += 0.04;
            }
            if(this.y > 190){
                this.bubbleEmitter.on = true;
            }
            if(this.y > this.game.width){
                this.kill(this);  
            }
          
        }

    }
}