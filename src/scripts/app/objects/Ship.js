import Garbage from '../objects/Garbage';
import FastShip from '../objects/FastShip';

class Ship extends Phaser.Sprite {

    constructor(game, x, y, speed = 80) {
        super(game, x, y, 'ship');

        this.speed = speed;
        this.anchor.set(0.5);
        this.explosionKeys = ['explosion01', 'explosion02', 'explosion03'];
        this.explosionPointer = 0;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = true;
        this.body.setSize(200, 143, 0, 0);
        this.body.velocity.x = this.speed;

        this.health = 3;
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

        // Generate garbage
        var rnd = this.game.rnd.integerInRange(0, 60);
        if(rnd === 27){
            var rndG = this.game.rnd.integerInRange(0, this.game.garbageKeys.length);
            var garbageKey = this.game.garbageKeys[rndG];    
            var rndSpeed = this.game.rnd.integerInRange(70, 110);
            this.game.garbageCollection.push(
                this.game.add.existing(
                    new Garbage(this.game, this.world.x, this.world.y, garbageKey, rndSpeed)
                )
            );    
        }
    }
    
    handleGarbageCollision(ship, garbage){
        console.log("ship is hit!");
        this.game.sound.play(this.explosionKeys[this.explosionPointer]);
        this.explosionPointer += 1;
        garbage.kill();
        this.health -= 1;
        
        if(this.health === 0){
            this.kill();
            this.game.shipStage += 1;
            // add two small fast ships
             this.game.shipOne = this.game.add.existing(this.makeFastShip(900, this.game.seaLevel - 40, -130));
             this.game.shipOne.zIndex = 2;
             this.game.shipTwo = this.game.add.existing(this.makeFastShip(1200, this.game.seaLevel - 40, 130));
             this.game.shipTwo.zIndex = 3;
             this.game.renderGroup.add(this.game.shipOne);
             this.game.renderGroup.add(this.game.shipTwo);
             this.game.renderGroup.sort('zIndex', Phaser.Group.SORT_ASCENDING);
        }
    }
    makeFastShip(x, y, speed){
        return new FastShip(this.game, x, y, speed);
    }
}


export default Ship;