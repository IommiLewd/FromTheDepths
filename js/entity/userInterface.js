class userInterface extends Phaser.Sprite {
    constructor(game) {
        super(game);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        console.log('interface Loaded!');
        //this.body.bounce.set(1, 0);
        this._loadDepthMeter();
        this._loadCourseSelector();
        this._loadStatusBar();
        this.depthArrowMoving = false;
        this.courseArrowMoving = false;
        this.events.deepChanger = new Phaser.Signal();
        this.events.courseChanger = new Phaser.Signal();
        this.course = 0;
        this.horizontalCoordinate = 190;
        this.depthLogger = 34;
        this.markerLocation = 546;
        this.body.velocity.x = 30;
    }

    _loadDepthMeter() {
        this.depthMeter = this.game.add.image(2, 36, 'depthMeter');
        this.depthMeter.fixedToCamera = true;
        this.depthArrow = this.game.add.sprite(0, 58, 'depthArrow');
        this.depthArrow.inputEnabled = true;
        this.depthArrow.fixedToCamera = true;
        this.depthArrow.events.onInputDown.add(this._setDepth, this);
        this.depthArrow.events.onInputUp.add(this._disableDepth, this);
    }
    _setDepth() {
        this.depthArrowMoving = true;
    }
    _disableDepth() {
        this.depthArrowMoving = false;
        this.events.deepChanger.dispatch(this.horizontalCoordinate);
    }

    _loadCourseSelector() {
        this.courseSelector = this.game.add.image(440, 338, 'courseSelector');
        this.courseArrow = this.game.add.image(546, 348, 'courseArrow');
        this.courseArrow.anchor.setTo(0.5);
        this.courseArrow.inputEnabled = true;
        this.courseArrow.events.onInputDown.add(this._setCourse, this);
        this.courseArrow.events.onInputUp.add(this._disableCourse, this);
        this.courseSelector.fixedToCamera = true;
     this.courseArrow.fixedToCamera = true;
    }

    _setCourse() {
        this.courseArrowMoving = true;


    }

    _disableCourse() {
        this.courseArrowMoving = false;
        this.events.courseChanger.dispatch(this.course);
    }

    _loadStatusBar() {
        this.statusBar = this.game.add.image(442, 4, 'statusBar');
        this.statusBar.fixedToCamera = true;
    }

    _depthUpdater() {
        if (this.depthArrowMoving === true) {
            if (this.game.input.worldY > this.y + 36 && this.game.input.worldY < this.y + 316) {
                this.depthLogger = this.game.input.y;
                this.horizontalLogger = this.depthLogger - 35;
                this.horizontalCoordinate = this.horizontalLogger / 280 * 290 + 165;
    
                this.depthArrow.cameraOffset.y = this.game.input.y;

            }
        }
    }

    _courseUpdater() {
        if (this.courseArrowMoving === true) {
                        if (this.game.input.x > 438 + 4 && this.game.input.x < 526 + 4 || this.game.input.x > 540 + 4 && this.game.input.x < 628 + 4) {
                            if (this.game.input.x > 443 && this.game.input.x < 529) {
                                this.courseArrow.cameraOffset.x = this.game.input.x;
                                this.course = this.game.input.x - 443;
                                this.course = (85 + 0) - this.course;
                                this.course = - Math.abs(this.course);
                           
            //                    
                            }
                            if (this.game.input.x > 545 && this.game.input.x < 640) {
                                this.courseArrow.cameraOffset.x = this.game.input.x;
                                this.course = this.game.input.x - 386 - 160;
                                
                   
                            }
//                            if(this.course < 5){
//                                this.course = 0;
//                            }
//                      
                        }
                    }

        }
    

    update() {
        this._depthUpdater();
        this._courseUpdater();



    }
}