import Garbage from '../objects/Garbage';
class Player extends Phaser.Sprite {

    constructor(game, x, y, speed = 10) {
        super(game, x, y, 'player', 'Player01');

        this.speed = speed;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = true;
        this.body.setSize(64, 32, 0, 0);
      
        this.animations.add('swim');
        this.animations.play('swim', 8, true);
  
        this.hasGarbage = false;

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
      // Input
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
      if(this.body.y < this.game.seaLevel){
        this.body.velocity.y = this.speed;
      }
      if(this.hasGarbage && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        console.log("firing garbage");
        this.hasGarbage = false;
        this.game.firedGarbage.push(
          this.game.add.existing(
            new Garbage(this.game, this.world.x, this.world.y, -220)
          )
        );
      }

      // Collisions
      for(var garbage of this.game.garbageCollection){
         this.game.physics.arcade.collide(this, garbage, this.collisionHandler, null, this);
      }
    }
    collisionHandler(player, garbage){
      console.log("Collision");
      garbage.kill();
      this.hasGarbage = true;
    }
  
    updateDirection(directionState) {
        if (this.direction != directionState) {
            this.direction = directionState;
            this.direction.setDirection(this);
        }
    }
}


export default Player;