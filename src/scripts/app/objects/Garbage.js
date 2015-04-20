
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
        this.hasAnimated = false;
    }

    update() {
        this.angle += 3;
        if(this.world.y > this.game.world.height){
            this.destroy();
        }
        if(this.world.y < 0){
            this.destroy();
        } 

        if(this.hasAnimated === false ){
            if( this.body.velocity.y > 0 && this.world.y > 120){
                this.playSplash();
            }else if(this.body.velocity.y < 0 && this.world.y < 120){
                this.playSplash();
            }
        }

    }
    playSplash(){
        this.hasAnimated = true;
        var splashAnimation = this.game.add.sprite(this.x, 100, 'splash');
        splashAnimation.animations.add('splash');
        splashAnimation.killOnComplete = true;
        splashAnimation.events.onAnimationComplete.add(function(){
           splashAnimation.destroy()
        }, this);
        splashAnimation.animations.play('splash', 12);
    }
}


export default Garbage;