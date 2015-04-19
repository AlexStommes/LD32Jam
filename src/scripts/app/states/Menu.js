/*
 * Menu state
 * ============================================================================
 *
 * This is a sample game menu, with mute, credits and game commands.
 */

import text from '../data/menu';
export default class Menu extends Phaser.State {

  create () {
    // Give a gray shade to the background, show the title logo and the "Start"
    // button.
    this.stage.backgroundColor = 0x333333;

  //  this.add.tween(this.add.image(0, 153, 'player', 'Player02'))
  //    .from({ y: -200 }, 2000, 'Elastic.easeOut')
  //    .start();


  this.add.tween(this.makeMenuLabel(450, 150, text))
      .from({ alpha: 0 }, 1500)
      .start();
  }

  update(){
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.state.start('Game'); 
    }
  }

  makeMenuLabel (x, y, creditsText) {
    var text = this.add.text(x, y, creditsText, {
      fill: 'white',
      align: 'center',
      font: '48px Arial, sans-serif'
    });

    text.anchor.set(0.5, 0);

    return text;
  }

}
