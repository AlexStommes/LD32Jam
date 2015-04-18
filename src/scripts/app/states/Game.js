/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */


import Player from '../objects/Player';

export default class Game extends Phaser.State {

  create () {
    this.game.world.setBounds(0, 0, 2000, 2000);
    this.game.stage.backgroundColor = "fff";
    this.makeGradient(this.game);
    
    //start of waves
    
    //end of waves

    let { centerX: x, centerY: y } = this.world;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.logo = this.add.image(x, y, 'phaser');
    this.logo.anchor.set(0.5);

    this.player = this.add.existing(this.makePlayer(x, y));
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.camera.follow(this.player);
  }

  update () {
    this.logo.angle += 0.1;
  }

  makePlayer (x, y, speed = 100) {
    return new Player(this.game, x, y, speed);
  }

  makeGradient(game){
    //robin's gradient:
    var out = [];
    var bmd = game.add.bitmapData(900, 600);
    bmd.addToWorld();
    // start of horizontal gradient
    var myY = 100;

    for (var i = 0; i < 600; i++)
    {
      var c = Phaser.Color.interpolateColor(0x2A8BCA, 0x38589C, 30, i);

      // console.log(Phaser.Color.getWebRGB(c));

      bmd.rect(0, myY, 900, myY+1, Phaser.Color.getWebRGB(c));

      out.push(Phaser.Color.getWebRGB(c));

      myY += 10;
    }
    // end robin's gradient
  }

}
