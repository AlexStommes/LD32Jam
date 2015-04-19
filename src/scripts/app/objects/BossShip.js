import Garbage from '../objects/Garbage';

class BossShip extends Phaser.Sprite {

    constructor(game, x, y, speed = 130) {
        super(game, x, y, 'mothership');

        this.world.x = x;
        this.world.y = y;
        this.speed = speed;
        if(this.speed > 0){
            this.scale.x *= -1;
        }
        this.anchor.set(0.5);
        this.explosionKeys = ['explosion01', 'explosion02', 'explosion03'];
        this.explosionPointer = 0;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = true;
        this.body.setSize(200, 143, 0, 0);
        this.body.velocity.x = this.speed;

        this.health = 9;
    }

    update() {

        if(this.health === 0) return;

        // Detect collisions
        for(var garbage of this.game.firedGarbage){
         this.game.physics.arcade.collide(this, garbage, this.handleGarbageCollision, null, this);
        }
        // Movement
        this.body.velocity.y = 0;    

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
        this.generateGarbage(-120);
        this.generateGarbage(0);
        this.generateGarbage(120)

    }
    
    handleGarbageCollision(ship, garbage){
        console.log("ship is hit!");
        this.game.sound.play(this.explosionKeys[this.explosionPointer]);
        this.explosionPointer += 1;
        garbage.kill();
        this.health -= 1;
        
        if(this.health === 0){
            this.kill();
            this.game.gameState = 'win';
        }
    }

    generateGarbage(offsetX){
        var rnd = this.game.rnd.integerInRange(10, 30);
        if(rnd === 27){
            var rndG = this.game.rnd.integerInRange(0, this.game.garbageKeys.length);
            var garbageKey = this.game.garbageKeys[rndG];    
            var rndSpeed = this.game.rnd.integerInRange(70, 110);
            this.game.garbageCollection.push(
                this.game.add.existing(
                    new Garbage(this.game, this.world.x+offsetX, this.world.y, garbageKey, rndSpeed)
                )
            );    
        }
        
    }
}


export default BossShip;