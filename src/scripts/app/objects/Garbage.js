
class Garbage extends Phaser.Sprite {

    constructor(game, x, y, garbageKey, speed = 80) {
        super(game, x, y, 'trash', garbageKey);
        this.garbageKey = garbageKey;
        this.world.x = x;
        this.world.y = y;
        this.speed = speed;
        this.anchor.set(0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.body.collideWorldBounds = false;
        this.body.setSize(32, 32, 0, 0);
        this.body.velocity.y = this.speed;
        this.body.checkWorldBounds = true;
        this.garbaged = false;
    }

    update() {
        this.angle += 3;
        if(this.world.y > this.game.world.height){
            this.destroy();
        }
        if(this.world.y < 0){
            this.destroy();
        } 
    }
}


export default Garbage;