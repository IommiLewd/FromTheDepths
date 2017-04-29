class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
       // this.load.image('creature', 'img/creatureTemplate.png');
      
        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.script('player', 'js/entity/player.js');
        this.load.script('weaponSystem', 'js/entity/weaponSystem.js');
        this.load.tilemap('mainMap', 'json/mainMap.json', null, Phaser.Tilemap.TILED_JSON); 
        this.load.image('bubble', 'img/bubble.png');
        this.load.image('cameraTarget', 'img/cameraTarget.png');
        this.load.spritesheet('explosion', 'img/explosion.png', 50, 50, 4);
        
        this.load.image('backgroundGradient', 'img/backgroundGradient2.png');
        this.load.image('statusPixel', 'img/statusPixel.png');
        this.load.image('crosshair', 'img/crosshair.png');
        this.load.image('torpedo', 'img/torpedo.png');
        this.load.image('testFire', 'img/testFire.png');
        this.load.image('wave', 'img/wave.png');
  
        //Neutral Ships
         this.load.script('neutralShips', 'js/entity/neutralShips.js');
        this.load.image('hauler', 'img/neutralShips/hauler.png');
        this.load.image('largeHauler', 'img/neutralShips/largeHauler.png');
        this.load.image('oilTanker', 'img/neutralShips/oilTanker.png');
        
        //subs
        this.load.image('playerSub', 'img/subs/playerSub.png');
        
        //Ui Related
         this.load.script('userInterface', 'js/entity/userInterface.js');
         this.load.image('depthMeter', 'img/ui/depthMeter.png');
         this.load.image('courseSelector', 'img/ui/courseSelector.png');
         this.load.image('statusBar', 'img/ui/statusBar.png');
         this.load.image('depthArrow', 'img/ui/depthArrow.png');
         this.load.image('courseArrow', 'img/ui/courseArrow.png');
        this.game.renderer.renderSession.roundPixels = true
    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}