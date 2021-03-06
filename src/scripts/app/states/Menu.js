
import text from '../data/menu';
export default class Menu extends Phaser.State {

  create () {

    this.stage.backgroundColor = 0x333333;
  
    this.logo = this.add.image(450, 300, 'menu');
    this.logo.anchor.set(0.5);
  }

  update(){
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.state.start('Game'); 
    }
  }
}
