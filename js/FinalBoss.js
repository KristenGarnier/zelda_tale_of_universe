FinalBoss = function (index, game, player, fireballs,x,y) {


    this.game = game;
    this.enemyHp = 120;
    this.player = player;
    this.fireballs = fireballs;
    this.nextFire = 0;
    this.alive = true;
    this.shotTimerEnemy =0;
    this.facingEnemy = 'right';
    this.pathCounter = 0;
    this.dammage = 4;

    this.enemy = game.add.sprite(x, y, 'Boss');


    this.enemy.anchor.set(0.5);

    this.enemy.name = index.toString();
    game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.fixedRotation = true;
    this.enemy.animations.add('walking_left',[4,5,6,7], 10, true);
    this.enemy.animations.add('walking_right',[8,9,10,11], 10, true);
    this.enemy.animations.add('walking_up',[12,13,14,15], 10, true);
    this.enemy.animations.add('walking_down',[0,1,2,3], 10, true);

    //this.enemyText = game.add.text(this.body.x, this.body.y - 30, this.enemyHp)

};

FinalBoss.prototype.damage = function(damage) {
    this.enemyHp -= damage;

    if (this.enemyHp <= 0)
    {
        this.alive = false;

        return true;
    }

    return false;

}

FinalBoss.prototype.update = function(pathCounter) {
    if (pathCounter <= 25)  {
        this.enemy.animations.play('walking_left');
        this.enemy.body.velocity.x = -100; this.enemy.body.velocity.y = 0;
        this.facingEnemy = 'left';
    } else if (pathCounter > 25 && pathCounter <= 50){
        this.enemy.animations.play('walking_up');
        this.enemy.body.velocity.x = 0; this.enemy.body.velocity.y = -100;
        this.facingEnemy = 'up';
    }
    else if (pathCounter > 50 && pathCounter <= 75){
        this.enemy.animations.play('walking_right');
        this.enemy.body.velocity.x = 100; this.enemy.body.velocity.y = 0;
        this.facingEnemy = 'right';
    }else {
        this.enemy.animations.play('walking_down');
        this.enemy.body.velocity.x = 0; this.enemy.body.velocity.y = 100;
        this.facingEnemy = 'down';
    }

    //this.enemy.enemyText.destroy();
    //this.enemy.enemyText = this.game.add.text(this.enemy.body.x - 5, this.enemy.body.y - 30, this.enemyHp);
        if (this.shotTimerEnemy < this.game.time.now) {
        this.shotTimerEnemy = this.game.time.now + 250;
        var fireball;
        var fireball_left;
        var fireball_up;
        var fireball_down;
        if (this.facingEnemy == 'right') {
            fireball = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-right');
            fireball_down = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-down');
            fireball_left = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-left');
            fireball_up = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-up');
        } else if(this.facingEnemy == 'left') {
            fireball = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-right');
            fireball_down = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-down');
            fireball_left = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-left');
            fireball_up = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-up');
        }else if(this.facingEnemy == 'up') {
            fireball = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-right');
            fireball_down = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-down');
            fireball_left = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-left');
            fireball_up = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-up');
        }
        else {
            fireball = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-right');
            fireball_down = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-down');
            fireball_left = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-left');
            fireball_up = this.fireballs.create(this.enemy.body.x +32 , this.enemy.body.y +32, 'arrow-up');
        }
        this.game.physics.enable(fireball, Phaser.Physics.ARCADE);
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.y = 0;

        this.game.physics.enable(fireball_left, Phaser.Physics.ARCADE);
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.y = 0;

        this.game.physics.enable(fireball_up, Phaser.Physics.ARCADE);
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.y = 0;

        this.game.physics.enable(fireball_down, Phaser.Physics.ARCADE);
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.y = 0;

            fireball.body.velocity.x = 300;
            fireball_left.body.velocity.x = -300;
            fireball_up.body.velocity.y = -300;
            fireball_down.body.velocity.y = 300;

    }

};