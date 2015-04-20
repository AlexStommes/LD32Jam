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
        this.canFireCount = 0;
        this.health = 5;
        this.hudText = this.game.add.text(20, 500, '', { font: "12pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 1 });
        this.hudText.fixedToCamera = true;
        this.hudText.setText(this.makeHudString());

        this.garbagePointer;

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
      this.canFireCount += 1;
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
      if(this.hasGarbage && this.canFireCount > 25 && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        console.log("firing garbage");
        this.game.sound.play('shoot');
        this.canFireCount = 0;
        this.hasGarbage = false;
        this.game.firedGarbage.push(
          this.game.add.existing(
            new Garbage(this.game, this.world.x, this.world.y,this.garbagePointer.garbageKey, -220)
          )
        );
       this.garbagePointer = null;
       this.hudText.setText(this.makeHudString());
      }

      // Collisions
      for(var garbage of this.game.garbageCollection){
         this.game.physics.arcade.collide(this, garbage, this.collisionHandler, null, this);
      }
    }
    collisionHandler(player, garbage){
      console.log("Collision");
      if(this.hasGarbage === false){
        this.game.sound.play('eat');
        this.hasGarbage = true;
        this.canFireCount = 0;        
      } else {
        this.health -= 1;
        this.game.sound.play('hit');
        var hitImage = this.game.add.sprite(garbage.x, garbage.y+15, 'hitStar')
        var destroySprite = function(){
            hitImage.destroy();
        }
        this.game.time.events.add(Phaser.Timer.SECOND/6, destroySprite, this);
      }
      garbage.kill();
      this.hudText.setText(this.makeHudString());
      this.garbagePointer = garbage;
    }

    render(){


    }
  
    updateDirection(directionState) {
        if (this.direction != directionState) {
            this.direction = directionState;
            this.direction.setDirection(this);
        }
    }

    makeHudString(){
      let bellyState = this.hasGarbage ? 'Full' : 'Empty';
      return 'HP: '+ this.health + '\nBelly: '+ bellyState;
    }
}


export default Player;