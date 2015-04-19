/**
 * Credits
 * ============================================================================
 *
 * Just a simple credits screen.
 */


// Not required, but I extracted out the credits text into its own file.
import text from '../data/credits';


export default class Credits extends Phaser.State {

  create () {
    this.stage.backgroundColor = '#333';

  this.add.tween(this.makeCreditsLabel(450, 150, text))
      .from({ alpha: 0 }, 1500)
      .start();
  }


  update(){
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.state.start('Game'); 
    }
    
  }

  makeCreditsLabel (x, y, creditsText) {
    var text = this.add.text(x, y, creditsText, {
      fill: 'white',
      align: 'center',
      font: '48px Arial, sans-serif'
    });

    text.anchor.set(0.5, 0);

    return text;
  }

  showMenu () {
    this.state.start('Menu');
  }

}
