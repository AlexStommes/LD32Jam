/*
 * Preload state
 * ============================================================================
 *
 * This state comprises two purposes: Take care of loading the remaining
 * assets used within your game, including graphics and sound effects, while
 * displaying a busy splash screen, showing how much progress were made
 * during the asset load.
 */

import assets from '../data/assets';

// To make matters easier, I prepared a SplashScreen class, responsible for
// displaying the decorated splash screen graphic, and the progress bar.
import SplashScreen from '../objects/SplashScreen';


export default class Preload extends Phaser.State {

  init () {
    this.assetsReady    = false;
    this.soundsToDecode = this.getAudioToDecode();
  }

  preload () {
    this.showSplashScreen();

    this.loadGraphics();
    this.loadAudio();
  }

  create () {
    this.assetsReady = true;
  }

  update () {
    // Wait until all sound effects have been decoded into memory.
    if (this.assetsReady && this.allSoundsDecoded) {
      this.state.start('Menu');
    }
  }

  // --------------------------------------------------------------------------

  getAudioToDecode () {
    if ('audio' in assets) {
      return assets['audio'].map(({ key }) => key);
    }

    return [];
  }

  showSplashScreen () {
    let { progressBar } = new SplashScreen(this.game);
    this.load.setPreloadSprite(progressBar);
  }

  loadGraphics () {
    this.load.pack('game', null, assets);
  }

  loadAudio () {
    if ('audio' in assets) {
      this.load.pack('audio', null, assets);
      this.sound.onSoundDecode.add((key) => this.dequeueDecodedSound(key));
    }
      this.game.load.audio('music', ['music.mp3']);
      this.game.load.audio('eat', ['eat.wav']);
      this.game.load.audio('hit', ['hit.wav']);
      this.game.load.audio('shoot', ['shoot.wav']);
      this.game.load.audio('explosion01', ['explosion01.wav']);
      this.game.load.audio('explosion02', ['explosion03.wav']);
      this.game.load.audio('explosion03', ['explosion03_long.wav']);
  }

  dequeueDecodedSound (key) {
    let position = this.soundsToDecode.indexOf(key);

    if (position > -1) {
      this.soundsToDecode.splice(position, 1);
    }
  }

  // --------------------------------------------------------------------------

  get allSoundsDecoded () {
    return this.soundsToDecode.length === 0;
  }

}
