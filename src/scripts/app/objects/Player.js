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


    constructor(game, x, y, speed = 10) {
        // Remember to always use `super()` calls, whatever the class you're
        // extending from, using the same constructor arguments you'd specify for
        // regular Phaser classes.
        super(game, x, y, 'player', 'Player01');

        // If you need to call `super` from overridden methods use the form
        // `super.method(...)` call, passing the arguments required by that
        // overridden method.

        this.speed = speed;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.animations.add('swim');
        this.animations.play('swim', 8, true);

        this.directionStates = {
            left: {
                setDirection: function(gameObject) {
                    if (gameObject.scale.x > 0){
                      gameObject.scale.x *= -1;
                    }
                    
                }
            },
            right: {
                setDirection: function(gameObject) {
                    if (gameObject.scale.x < 0) {
                        gameObject.scale.x *= -1;
                    }
                    
                }
            },
            none: {}
        };
        this.direction = this.directionStates.none;
    }

    update() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.updateDirection(this.directionStates.left);
            this.body.velocity.x = -this.speed;
        } 
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.updateDirection(this.directionStates.right);
             this.body.velocity.x = this.speed;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
             this.body.velocity.y = -this.speed;
        } 
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.body.velocity.y = this.speed;
        }
    }

    updateDirection(directionState) {
        if (this.direction != directionState) {
            this.direction = directionState;
            this.direction.setDirection(this);
        }
    }
}


export
default Player;