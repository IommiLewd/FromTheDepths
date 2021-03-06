/**
 * base class for a simple game level.
 *
 * @constructor  {}
 * @method   :
 * @property :
 * startPosition {} (x,y)
 */

class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.stage.backgroundColor = "#1b2823";
        this.game.world.setBounds(0, 0, 1600, 500);
        this.backgroundGradient = this.game.add.tileSprite(0, 0, 1600, 500, 'backgroundGradient');

    }
    _loadInterface() {
        this.interface = new userInterface(this.game);
        this.interface.fixedToCamera = true;
    }
    _loadPlayer() {
        this.player = new Player(this.game, 100, 190, 'playerSub');
        // this.player.fixedToCamera = true;
        // this.game.camera.follow(this.player);
    }

    _loadWaveGenerator() {
        this.waveHandler = this.game.add.group();
        this.mapLength = this.world.width / 32;
        this.mapLength = Math.round(this.mapLength);
        console.log(this.mapLength);
        for (var i = 0; i < this.mapLength; i++) {
            this.waveSprite = this.game.add.sprite(i * 32, 200, 'wave');
            this.waveHandler.add(this.waveSprite);
        }
    }

    _loadWeaponSystem() {
        this.weapons = new weaponSystem(this.game);
        this.weapons.fixedToCamera = true;
        // this.game.camera.follow(this.weapons.crosshair);
    }

    _generateConvoy() {
        var placement = 400;
        for (var i = 0; i < 4; i++) {
            this._loadNeutralShips(placement, 105);
            placement += 320;
        }
    }

    _loadNeutralShips(x, y, type) {
        if (type === undefined) {
            type = Math.floor(Math.random() * (3 - 0 + 0)) + 0;
            console.log(type);
        }

        this.neutralShipArray = [
         //0 - key, 1 - keel depth, 2 - health

          ['oilTanker', 114, 620, 18400],
          ['hauler', 108, 420, 13600],
          ['largeHauler', 108, 550, 15200],
        ];
        console.log('type again  ' + type);

        this.neutralShip = new neutralShips(this.game, x, y, this.neutralShipArray[type][0], this.neutralShipArray[type][1], this.neutralShipArray[type][2]);
        this.shipGroup.add(this.neutralShip);

    }
    
    
    
    
    _loadEnemyShips(){
        this.enemyShip = new enemyShips(this.game, 100, 100, 'torpedoBoat' , 124, 450);
        this.shipGroup.add(this.enemyShip);
    }
    
    _loadCameraAnchor() {
        this.cameraTarget = this.game.add.image(200, 200, 'cameraTarget');
        this.cameraTarget.anchor.setTo(0.5);
        this.game.camera.follow(this.cameraTarget);

    }

    _torpedoImpact(neutralShip, torpedo) {
        console.log('ass');
        this.weapons._torpedokilled(torpedo.x, torpedo.y, torpedo);
        neutralShip._damageTaken(145);
        var shipHealth = neutralShip.neutralShipHealth / neutralShip.neutralShipInitialHealth * 100;
        console.log('ouch! Damage taken! Health is at ' + shipHealth + ' % with   ' + neutralShip.neutralShipHealth + ' health left!');
    }
    _torpedoCheck(torpedo, neutralShip) {
        var isTrue = true;
        if (torpedo.isAlive) {
            isTrue = true;
        } else {
            isTrue = false;
        }
        return isTrue;
    }

    _collisionHandler() {
        this.game.physics.arcade.collide(this.shipGroup, this.weapons.torpedos, this._torpedoImpact, this._torpedoCheck, this);
    }
    _animateWaves() {
        this.count += 0.08;
        var i = 0;
        this.waveHandler.forEach(function (currentWave) {
            var x = i + this.count;
            var y = Math.sin(x) * 4;
            currentWave.y = y + 135;
            i++;
        }, this);

    }

    preload() {

    }
    create() {
        this._gameWidth = 1600;
        this.count = 0;
        this._loadLevel();
        this.shipGroup = this.game.add.group();
        //this._loadNeutralShips(400, 105);
        //this._generateConvoy();
        this._loadEnemyShips();
        this._loadWaveGenerator();
        this._loadPlayer();
        this._loadWeaponSystem();
        this._loadInterface();
        this._loadCameraAnchor();
        this.courseUpdater = this.interface.events.courseChanger.add(this.player._courseUpdate, this.player, 0);
        this.depthUpdater = this.interface.events.deepChanger.add(this.player._depthUpdate, this.player, 0);
    }
    update() {
        this._collisionHandler();
        var midX = (this.player.x + 25 + this.weapons.crosshair.x) / 2;
        var midY = (this.player.y + 25 + this.weapons.crosshair.y) / 2;

        this.backgroundGradient.tilePosition.x -= 0.1;

        this.cameraTarget.x = midX;
        this.cameraTarget.y = midY;



        this._animateWaves();
        this.weapons.torpedoRotation = this.player.rotation;
        this.weapons.shipX = this.player.x;
        this.weapons.shipY = this.player.y;
    }
}








/*
  _addEnemies() {
        //Create Group enemies to handle collisions
        this.enemies = this.add.group();
        //Create Array to store all objects with the type 'enemy'
        var enemyArr = this._findObjectsByType('enemy', this._map, 'ObjectLayer');
        //For Each element in array create Enemy Instance
        enemyArr.forEach(function (element) {
            this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
            //add enemy to enemies array
            this.amountOfEnemies++;
            this.enemies.add(this.enemy);

        }, this);

    }

    _enemy_hit(bullet, enemy) {
        enemy.animations.play('FastMovement');
        bullet.kill();
        enemy._health -= this._damage;

        enemy._enemy_MovementReset();
        enemy.body.velocity.y = 0;
        enemy._player_spotted = true;
        enemy._damage_animation();
        if (enemy._health < 1) {
            enemy.kill();
            this.player._activeEnemies--;
            this.player._enemyProgressUpdate();
            if (this.player._activeEnemies === 0) {
                console.log('arghblargh');
                this.amountOfEnemies = 0;

                this._monster_Spawner();
                this.player._activeEnemies = this.amountOfEnemies;
                this.player._enemiesInRound = this.amountOfEnemies;
                this.player._enemyProgressUpdate();
                console.log()

            }
        }


    }
    
    
    
        _enemy_hit(bullet, enemy) {

        bullet.kill();
        enemy._health -= this._damage;
        enemy._enemy_MovementReset();
        if (enemy._health < 1) {
            enemy.kill();
                console.log('enemyHit!);

            }
        }


    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        _player_damage(player, enemy) {
        if (this.player._health < 1) {
            this.player._health = 0;
        } else if (this.time.now > this.biteTimer && this.player._health > 1) {
            this.game.camera.shake(0.06, 40);
            this.player._health -= 30;
            this.biteTimer = this.time.now + 450;
            enemy._enemy_MovementReset();
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 1, enemy._enemy_MovementReset, enemy);
    }
*/




/*

    //  this.game.physics.arcade.overlap(this.bullet, this._collision_layer, this._kill_bullet, null, this);
           // this.game.physics.arcade.collide(this.player, this.enemies, this._player_damage, null, this);

            //this.game.physics.arcade.collide(this.enemies, this._collision_layer);
           // this.game.physics.arcade.collide(this.bullet, this.enemies, this._enemy_hit, null, this);











  _monster_Spawner() {
            this._current_wave++;
            this._waveModifier += 2;
            this.player._currentWave.setText(this._current_wave);
            console.log('MonsterSpawner Fired! Current Wave Count ' + this._current_wave);
            var spawnArr = this._findObjectsByType('MonsterSpawner', this._map, 'ObjectLayer');
            //For Each element in array create Enemy Instance
            for (this.r = 0; this.r < 4 + this._waveModifier; this.r++) {
                spawnArr.forEach(function (element) {
                    for (this.i = 0; this.i < 1; this.i++) {
                        this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
                        console.log('Enemy Added');
                    }
                       this.amountOfEnemies++;
                    //add enemy to enemies array
                    this.enemies.add(this.enemy);
                }, this);
            }
        }*/






/*


create() { // bullet group    APP.bullets = game.add.group();    APP.bullets.createMultiple(10, 'bullet');    APP.bullets.setAll('anchor.x', 0.5);    APP.bullets.setAll('anchor.y', 1);    // ensure that all bullets have physics, rather than setting individually    APP.bullets.enableBody = true;    APP.bullets.physicsBodyType = Phaser.Physics.ARCADE;}update(){if (APP.fireButton.isDown)        {            fireBullet();        }// Changed the overlap to check the layer against the whole group instead of// an individual global bullet reference which will keep changing.game.physics.arcade.overlap(APP.layer, APP.bullets, function(bullet, layer) {        bullet.kill();    }, null, this);}}function fireBullet() {    if (game.time.now > APP.bulletTime) {        //game.sound.play('fire');        APP.bulletTime = game.time.now + APP.bulletRate;        // Grab the first bullet we can from the pool that's dead (to ensure        // you don't accidentally grab bullets which are mid-flight)        var currentBullet = APP.bullets.getFirstDead();        if (currentBullet)        {            currentBullet.lifespan = 2000; // kill after 2000ms            if (APP.facing === "right") {                //  And fire it                currentBullet.reset(APP.player.x + 15, APP.player.y + 15);                currentBullet.body.velocity.x = APP.bulletvelocity;            }            else if (APP.facing === "left") {                currentBullet.reset(APP.player.x, APP.player.y + 15);                currentBullet.body.velocity.x = -APP.bulletvelocity;            }        }    }}*/