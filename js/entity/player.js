class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.x = 10;
        this.body.maxVelocity.y = 15;
        this.newDepth = 190;
        this._thruster();
        this._vent();
        //this._loadDetectionSphere();
        this.detectionRating = 2;
        this._loadDepthDisplay();
    }
    _depthUpdate(newDepth) {
        this.newDepth = newDepth;

    }
    _courseUpdate(course) {
        this.body.acceleration.x = course / 20;
        if (course < 0) {
            this.thruster.angle = 180;
            this.thruster.y = -15;
        } else {
            this.thruster.angle = 0;
            this.thruster.y = 15;
        }
        course = Math.abs(course);
        course = course / 4;
        this.body.maxVelocity.x = course;
        if (course < 5 && course > -5) {
            this.thruster.frequency = 330;
        } else {
            this.thruster.frequency = 130;
        }
    }

    _loadDepthDisplay() {
        this.depthDisplay = this.game.add.tileSprite(4, 38, 2, 20, 'statusPixel');
        this.depthDisplay.fixedToCamera = true;
    }

    _thruster() {
        this.thruster = this.game.add.emitter(-36, 12, 200);
        this.thruster.makeParticles('bubble');
        this.thruster.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.thruster.minParticleSpeed = new Phaser.Point(-200, -50);
        this.thruster.setRotation(0, 0);
        this.thruster.setAlpha(0.1, 1.0, 800);
        this.thruster.forEach(function (particle) {
            particle.body.allowGravity = false;

        }, this);
        this.thruster.setScale(0.3, 0.8, 0.3, 0.8, 260);
        this.thruster.start(false, 260, 230);

        this.addChild(this.thruster);
       // this.thruster.on = false;
    }

    _vent() {
        this.ventilator = this.game.add.emitter(-4, -28, 200);
        this.ventilator.makeParticles('bubble');
        this.ventilator.height = 20;
        this.ventilator.maxParticleSpeed = new Phaser.Point(-60, 10);
        this.ventilator.minParticleSpeed = new Phaser.Point(-160, -10);
        this.ventilator.setRotation(0, 0);
        this.ventilator.setAlpha(0.1, 1.);
        this.ventilator.forEach(function (particle) {
            //            particle.body.allowGravity = false;
            particle.body.gravity.y = 130;

        }, this);
        this.ventilator.setScale(0.3, 1, 0.3, 1, 500);
        this.ventilator.start(false, 280, 130);
        this.ventilator.angle = 90;
        this.addChild(this.ventilator);
        //this.ventilator.on = false;
    }

    update() {

    

      

        this.depthDisplay.height = this.y / 290 * 280 - 155;
        if (this.y < this.newDepth - 1) {
            this.body.acceleration.y = 3;
            //            this.ventilator.on = true;
            this.ventilator.frequency = 30;

            if (this.angle < 22) {
                this.angle += 0.08;
            }
        } else if (this.y > this.newDepth + 1) {
            this.ventilator.frequency = 30;
            this.body.acceleration.y = -3;
            if (this.angle > -22 ) {
                this.angle -= 0.08;
            }
        } else {

            this.body.velocity.y = 0;
            if (this.angle < -1) {
                this.angle += 0.08;
            } else if (this.angle > 1) {
                this.angle -= 0.08;
            } else {
                this.ventilator.frequency = 280;
            }

        }



    }
}









//
//    _detectionUpdate(){
//        this.detectionSphere.scale.setTo(0.1);
//       this.ulcerate = this.game.add.tween(this.detectionSphere.scale).to({ x: this.detectionRating, y: this.detectionRating}, 3000, Phaser.Easing.linear, true);
//        this.ulcerate.onComplete.add(function(){
//            this.detectionSphere.scale.setTo(0.0, 0.0);
//            this._detectionUpdate();
//        },this);
//    }
//    
//    _loadDetectionSphere(){
//        this.detectionSphere = this.game.add.sprite(0 , 0 , 'detectionSphere');
//        this.detectionSphere.anchor.setTo(0.5);
//        this.addChild(this.detectionSphere);
//        this._detectionUpdate();
//    }