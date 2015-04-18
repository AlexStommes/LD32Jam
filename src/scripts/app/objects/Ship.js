class Ship extends Phaser.Sprite {


    constructor(game, x, y, speed = 80) {
        // Remember to always use `super()` calls, whatever the class you're
        // extending from, using the same constructor arguments you'd specify for
        // regular Phaser classes.
        super(game, x, y, 'ship');

        // If you need to call `super` from overridden methods use the form
        // `super.method(...)` call, passing the arguments required by that
        // overridden method.
        this.world.x = x;
        this.world.y = y;
        this.speed = speed;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = false;
        this.body.setSize(200, 143, 0, 0);
        this.body.velocity.x = this.speed;
      
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
        
        if(this.body.velocity.x > 0){
            if(this.world.x > this.game.world.width - 400){
                this.body.velocity.x = -Math.abs(this.speed);
                this.world.x = this.game.world.width - 401; 
                this.scale.x *= -1;
            }
        } 

        if(this.body.velocity.x < 0){
            if(this.world.x < 400){
                this.body.velocity.x = Math.abs(this.speed);
                this.world.x = 401; 
                this.scale.x *= -1;
            }
        }
        
        //if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        //    this.updateDirection(this.directionStates.left);
        //    this.body.velocity.x = -this.speed;
        //} 
        //else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        //    this.updateDirection(this.directionStates.right);
        //     this.body.velocity.x = this.speed;
        //}
    }

    updateDirection(directionState) {
        if (this.direction != directionState) {
            this.direction = directionState;
            this.direction.setDirection(this);
        }
    }
}


export default Ship;