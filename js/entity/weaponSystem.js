class weaponSystem extends Phaser.Sprite {
    constructor(game) {
        super(game);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        console.log('Weapon System Loaded!!');
        this._initCrosshair();
        this._initTorpedos();
        this._initLaunchButton();
        this._initExplosion();
        this._nextFire = 0;
        this.fireRate = 100;
        this.torpedoRotation = 0;
        this.TURN_RATE = 0.4;
        this.SPEED = 70;
        this.shipX = 0;
        this.shipY = 0;
    }

    _initCrosshair() {
        this.crosshair = this.game.add.sprite(60, 60, 'crosshair');
        this.crosshair.anchor.setTo(0.5);
        this.crosshair.inputEnabled = true;
        this.crosshair.input.enableDrag(true);
        this.crosshair.fixedToCamera = true;
    }
    _initLaunchButton() {
        this.launchButton = this.game.add.image(26, 328, 'testFire');
        this.launchButton.fixedToCamera = true;
        this.launchButton.inputEnabled = true;
        this.launchButton.events.onInputUp.add(this._launch, this);
    }

    _launch() {
        this.torpedo;
        if (this.game.time.now > this._nextFire) {
            this._nextFire = this.game.time.now + this.fireRate;
            console.log('fired!');
            this.torpedo = this.torpedos.getFirstDead();

            this.torpedo.reset(this.shipX + 30, this.shipY + 10);
            //this.game.physics.arcade.velocityFromRotation(this.torpedoRotation, 20, this.torpedo.body.velocity);
            this.game.camera.shake(0.004, 40);
            this.torpedo.rotation = this.torpedoRotation;
            this.torpedo.bringToTop();
            this.torpedos.add(this.torpedo);
            //this.torpedo.body.velocity.x = 30;
            this._torpedoThruster();




        }

    }

    _torpedokilled(x, y) {
        console.log('torpedo killed at' + x + y);
        this.currentExplosion;
        this.currentExplosion = this.explosion.getFirstDead();
        this.currentExplosion.reset(x, y);
        var rotation = Math.floor(Math.random() * 3) + 1;
        rotation *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.game.camera.shake(0.04, 40);
        this.currentExplosion.rotation = rotation;
        this.currentExplosion.scale.setTo(1.2);
        this.currentExplosion.animations.add('boom', null, 10);
        this.currentExplosion.animations.play('boom');
        this.currentExplosion.animations.currentAnim.onComplete.add(function (currentExplosion) {
            currentExplosion.kill(this);
        }, this);


    }

    _initExplosion() {
        this.explosion = this.game.add.group();
        this.explosion.createMultiple(50, 'explosion');
        this.explosion.setAll('anchor.x', 0.5);
        this.explosion.setAll('anchor.y', 0.5);

    }

    _torpedoThruster() {
        this.torpedoThruster = this.game.add.emitter(0, 0, 0);
        this.torpedoThruster.width = 0;
        this.torpedoThruster.height = 0;
        
        this.torpedoThruster.makeParticles('bubble');
        this.torpedoThruster.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.torpedoThruster.minParticleSpeed = new Phaser.Point(-200, -50);
        this.torpedoThruster.setRotation(0, 0);
        this.torpedoThruster.setAlpha(1.0, 0.1, 400);
        this.torpedoThruster.forEach(function (particle) {
            particle.body.allowGravity = false;

        }, this);
        this.torpedoThruster.setScale(0.3, 0.7, 0.3, 0.7, 250);
        this.torpedoThruster.start(false, 250, 20);
        this.torpedo.addChild(this.torpedoThruster);

    }

    _initTorpedos() {
        console.log('Torpedoes Initialized');
        this.torpedos = this.game.add.group();
        this.torpedos.enableBody = true;
        this.torpedos.physicsBodyType = Phaser.Physics.ARCADE;
        this.torpedos.createMultiple(50, 'torpedo');
        this.torpedos.setAll('checkWorldBounds', true);
        this.torpedos.setAll('outOfBoundsKill', true);
        this.torpedos.setAll('anchor.x', 0.5);
        this.torpedos.setAll('anchor.y', 0.5);
        //  --- Disable Gravity for Each Bullet
        this.torpedos.forEach(function (L) {
            L.body.allowGravity = true;
        })
    }

    update() {

        this.torpedos.forEachAlive(function (torpedo) {




            if (torpedo.y < 150) {
                this._torpedokilled(torpedo.x, torpedo.y);
                torpedo.kill();
            }
            if (torpedo.y > 490) {
                this._torpedokilled(torpedo.x, torpedo.y);
                torpedo.kill();
            }

            var targetAngle = this.game.math.angleBetween(
                torpedo.x, torpedo.y,
                this.crosshair.x, this.crosshair.y
            );
            var targetDistance = this.game.math.distance(torpedo.x, torpedo.y, this.shipX, this.shipY);
            var delta = targetAngle - torpedo.rotation;
            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;



            if ( /*targetDistance < 280 && */ targetDistance > 80) {
                if (delta > 0) {
                    torpedo.angle += this.TURN_RATE;
                } else {
                    torpedo.angle -= this.TURN_RATE;
                }
            }

            //this.game.physics.arcade.accelerationFromRotation(torpedo.rotation, this.SPEED, torpedo.body.acceleration);
            //  torpedo.body.velocity.x = 30;
            this.game.physics.arcade.velocityFromRotation(torpedo.rotation, this.SPEED, torpedo.body.velocity);
        }, this);









    }
}