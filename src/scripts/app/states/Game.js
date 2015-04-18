/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Player from '../objects/Player';

export default class Game extends Phaser.State {

  create () {
    let { centerX: x, centerY: y } = this.world;

    this.logo = this.add.image(x, y, 'phaser');
    this.logo.anchor.set(0.5);
	
    this.player = this.add.existing(this.makePlayer(x, y));

	//this.player = this.add.image(x, y, 'player');
	//this.logo.anchor.set(0.5);
  }

  update () {
    this.logo.angle += 0.1;
	//this.player.angle += -0.1;
  }

  makePlayer (x, y, speed = 20) {
    return new Player(this.game, x, y, speed);
  }

}
