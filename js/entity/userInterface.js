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
        this.courseHandler = 0;
        this.horizontalCoordinate = 130;
    }

    _loadDepthMeter() {
        this.depthMeter = this.game.add.image(2, 36, 'depthMeter');
        this.depthArrow = this.game.add.sprite(0, 34, 'depthArrow');
        this.depthArrow.inputEnabled = true;
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
        this.courseArrow = this.game.add.image(542, 340, 'courseArrow');
        this.courseArrow.inputEnabled = true;
        this.courseArrow.events.onInputDown.add(this._setCourse, this);
        this.courseArrow.events.onInputUp.add(this._disableCourse, this);
    }

    _setCourse() {
        this.courseArrowMoving = true;

    }

    _disableCourse() {
        this.courseArrowMoving = false;
        this.events.courseChanger.dispatch(this.courseHandler);
    }




    _loadStatusBar() {
        this.statusBar = this.game.add.image(378, 2, 'statusBar');
    }

    update() {

        if (this.depthArrowMoving === true) {
            if (this.game.input.y > 34 && this.game.input.y < 316) {
                this.depthArrow.y = this.game.input.y;
                this.horizontalCoordinate = this.depthArrow.y;
             
            }
        }

        
        
        
        if (this.courseArrowMoving === true) {
            if (this.game.input.x > 440 && this.game.input.x < 516 || this.game.input.x > 542 && this.game.input.x < 620) {
                this.courseArrow.x = this.game.input.x;
                if (this.game.input.x > 440 && this.game.input.x < 516) {
                    this.courseHandler = this.game.input.x - 515;
                }
                if (this.game.input.x > 542 && this.game.input.x < 620) {
                    this.courseHandler = this.game.input.x - 540;
                  
                }
            }
        }


    }
}