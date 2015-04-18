/*
 * Player
 * ============================================================================
 *
 *
 * This is an example prefab, demonstrating how you could extend a Phaser
 * class to make your own game objects. You can extend from other Phaser
 * object classes too, not just Sprites. Refer to the `ActionsMenu` example
 * for a more advanced prefab.
 *
 * Here, I'm using a tween, instead of rotating the logo by updating its
 * angle, but you can do whatever you creativity demand you, so try that!
 */


class Player extends Phaser.Sprite {

  constructor (game, x, y, interval = 4000) {
    // Remember to always use `super()` calls, whatever the class you're
    // extending from, using the same constructor arguments you'd specify for
    // regular Phaser classes.
    super(game, x, y, 'player');

    // If you need to call `super` from overridden methods use the form
    // `super.method(...)` call, passing the arguments required by that
    // overridden method.

    this.anchor.set(0.5);

    this.makeRotationTween(interval).start();
  }

  makeRotationTween (interval) {
    // Tilt back and forth this sprite.
    return this.game.add.tween(this)
      .to({ angle: -720 }, interval, Phaser.Easing.Sinusoidal.In)
      .to({ angle:  720 }, interval, Phaser.Easing.Sinusoidal.Out)
      .loop(true);
  }

}


export default Player;
