import Garbage from '../objects/Garbage';

class Ship extends Phaser.Sprite {

    constructor(game, x, y, speed = 80) {
        super(game, x, y, 'ship');

        this.world.x = x;
        this.world.y = y;
        this.speed = speed;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = true;
        this.body.setSize(200, 143, 0, 0);
        this.body.velocity.x = this.speed;
    }

    update() {
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
            var rndSpeed = this.game.rnd.integerInRange(70, 110);
            this.game.garbageCollection.push(
                this.game.add.existing(
                    new Garbage(this.game, this.world.x, this.world.y, rndSpeed)
                )
            );    
        }
    }
    
    handleGarbageCollision(ship, garbage){
        console.log("ship is hit!");
        garbage.kill();
    }
}


export default Ship;