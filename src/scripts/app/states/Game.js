/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */


import Player from '../objects/Player';
import Ship from '../objects/Ship';

export default class Game extends Phaser.State {

  create () {
    this.game.world.setBounds(0, 0, 1800, 900);
    this.game.stage.backgroundColor = "85E0FF";
    this.sky(this.game);
    this.game.seaLevel = 160;
    this.makeGradient(this.game);
    this.makeWaves(this.game);
    this.makeFloor(this.game);

    let { centerX: x, centerY: y } = this.world;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.logo = this.add.image(x, y, 'phaser');
    this.logo.anchor.set(0.5);

    this.player = this.add.existing(this.makePlayer(x, y));
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.camera.follow(this.player);

    this.ship = this.add.existing(this.makeShip(x, this.game.seaLevel - 143/2, -80));
  }

  update () {
    this.logo.angle += 0.1;
  }

  makePlayer (x, y, speed = 120) {
    return new Player(this.game, x, y, speed);
  }  

  makeShip (x, y, speed = -80) {
    return new Ship(this.game, x, y, speed);
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

  // waves!!!
  makeWaves(game) {
    var wavesWidth=32;
    var wavesHeight=32;
    var wavesx=0;
    var wavesy= this.game.seaLevel - wavesHeight;
    var numTiles = this.calculateTiles(game.world.width, wavesWidth);
    for (var i = 0; i < numTiles; i++){
      wavesx = i*wavesWidth;
      this.waves=this.add.image(wavesx,wavesy,'waves');
    }
  }

  // sea floor!!!
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

}
