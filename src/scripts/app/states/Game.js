import Player from '../objects/Player';
import Ship from '../objects/Ship';
import BossShip from '../objects/BossShip';
import FastShip from '../objects/FastShip';

export default class Game extends Phaser.State {

  create () {
    this.game.world.setBounds(0, 0, 1800, 600);
    this.game.stage.backgroundColor = "85E0FF";
    this.sky(this.game);
    this.game.seaLevel = 160;
    this.game.garbageKeys = ['trash01', 'trash02', 'trash03', 'trash04', 'trash05', 'trash06', 'trash07'];
    this.game.shipStage = 0;
    this.game.fastShipsKilled = 0;
    this.game.gameState = 'playing';
    this.makeGradient(this.game);
    this.makeFloor(this.game);
    this.music = this.game.sound.play('music', 0.8, true);

    let { centerX: x, centerY: y } = this.world;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.add.existing(this.makePlayer(x, y));
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.camera.follow(this.player);
    this.game.garbageCollection = [];
    this.game.firedGarbage = [];
    this.game.renderGroup = this.game.add.group();
    this.backgroundWaves = this.makeBackgroundWaves(this.game);
    this.backgroundWaves.zIndex = 0;
    this.game.renderGroup.add(this.backgroundWaves);

    // this.game.ship = this.game.add.existing(this.makeShip(x, this.game.seaLevel - 143/2, -80));
    this.waves = this.makeWaves(this.game);
    this.waves.zIndex = 4;
    this.game.renderGroup.add(this.waves);
    this.game.ship = this.game.add.existing(this.makeShip(x, this.game.seaLevel - 160/2, -80));
    this.game.ship.zIndex = 2;
    this.game.renderGroup.add(this.game.ship);
    this.game.renderGroup.sort('zIndex', Phaser.Group.SORT_ASCENDING);
  }

  update () {
    if(this.game.gameState === 'win'){
       this.music.stop();
       this.state.start('Win');
    } 
    if(this.player.health === 0){
       this.music.stop();
       this.state.start('Fail');
    }
    if(this.game.fastShipsKilled === 2){
      this.game.fastShipsKilled = 0;
      this.game.bossShip = this.game.add.existing(this.makeBossShip(this.game.world.width/2, this.game.seaLevel - 75, -80));
      this.game.bossShip.zIndex = 2;
      this.game.renderGroup.add(this.game.bossShip);
      this.game.renderGroup.sort('zIndex', Phaser.Group.SORT_ASCENDING);
    }
    if (this.waves.x<32){
      this.waves.x += .5;
    } else {
      this.waves.x = 0;
    }
    if (this.backgroundWaves.x<24){
      this.backgroundWaves.x += .3;
    } else {
      this.backgroundWaves.x = 0;
    }


    if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)) {
      this.music.pause();
    }    
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.U)){
      this.music.resume();
    }
  }


  makePlayer (x, y, speed = 120) {
    return new Player(this.game, x, y, speed);
  }  

  makeShip (x, y, speed = -80) {
    return new Ship(this.game, x, y, speed);
  }  
  makeBossShip (x, y, speed = -80) {
    return new BossShip(this.game, x, y, speed);
  }

  sky(game) {
    var out = [];
    var worldWidth = game.world.width;
    var worldHeight = game.world.height;
    var bmd = game.add.bitmapData(worldWidth, worldHeight);
    bmd.addToWorld();

    var myY = 0;

    for (var i = 0; i < 20; i++)
    {
      var c = Phaser.Color.interpolateColor(0x85E0FF, 0xD6F5FF, 30, i);
      bmd.rect(0, myY, worldWidth, myY+1, Phaser.Color.getWebRGB(c));
      out.push(Phaser.Color.getWebRGB(c));
      myY += 5;
    }
  }

  makeGradient(game){
    //robin's gradient:
    var out = [];
    var worldWidth = game.world.width;
    var worldHeight = game.world.height;
    var bmd = game.add.bitmapData(worldWidth, worldHeight);
    bmd.addToWorld();
    // start of horizontal gradient
    var myY = game.seaLevel;

    for (var i = 0; i < worldHeight; i++)
    {
      var c = Phaser.Color.interpolateColor(0x2A8BCA, 0x38589C, 30, i);

      // console.log(Phaser.Color.getWebRGB(c));

      bmd.rect(0, myY, worldWidth, myY+1, Phaser.Color.getWebRGB(c));

      out.push(Phaser.Color.getWebRGB(c));

      myY += 10;
    }
  }

  makeBackgroundWaves(game) {
    var waveGroup = game.add.group();
    var waveWidth = 24;
    var waveHeight = 24;
    var wavex = -24;
    var wavey = game.seaLevel - waveHeight - 16;
    var numTiles = this.calculateTiles(game.world.width, waveWidth);
    for (var i = -1; i < numTiles; i++){
      wavex = i*waveWidth;
      waveGroup.create(wavex, wavey, 'wave')
    }
    return waveGroup;
  }

  makeWaves(game) {
    var waveGroup = game.add.group();
    var waveWidth = 32;
    var waveHeight = 32;
    var wavex = -32;
    var wavey = game.seaLevel - waveHeight;
    var numTiles = this.calculateTiles(game.world.width, waveWidth);
    for (var i = -1; i < numTiles; i++){
      wavex = i*waveWidth;
      waveGroup.create(wavex, wavey, 'wave')
    }
    return waveGroup;
  }

  makeFloor (game) {
    var floorx=0;
    var floorWidth=32;
    var floory=game.world.height-floorWidth;
    var numTiles = this.calculateTiles(game.world.width, floorWidth);
    for (var spacer = 0; spacer < numTiles; spacer++){
      floorx = spacer*floorWidth;
      this.addFloor=this.add.image(floorx,floory,'floorTile');
    }
  }

  calculateTiles(worldWidth, tileWidth) {
    return worldWidth / tileWidth + 1;
  }
  makeFastShip(x, y, speed){
      return new FastShip(this.game, x, y, speed);
  }
}
