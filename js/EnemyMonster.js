EnemyMonster = function (index, game, player, fireballs,x,y) {


    this.game = game;
    this.enemyHp = 20;
    this.player = player;
    this.fireballs = fireballs;
    this.nextFire = 0;
    this.alive = true;
    this.shotTimerEnemy =0;
    this.facingEnemy = 'right';
    this.pathCounter = 0;
    this.dammage = 3;

    this.enemy = game.add.sprite(x, y, 'monster');

    this.enemy.anchor.set(0.5);

    this.enemy.name = index.toString();
    game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.immovable = false;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.fixedRotation = true;
    this.enemy.animations.add('walking_left',[0,1], 5, true);
    this.enemy.animations.add('walking_right',[2,3], 5, true);
    //this.enemyText = game.add.text(this.body.x, this.body.y - 30, this.enemyHp)

};

EnemyMonster.prototype.damage = function(damage) {
    this.enemyHp -= damage;

    if (this.enemyHp <= 0)
    {
        this.alive = false;

        return true;
    }

    return false;

}

EnemyMonster.prototype.update = function(pathCounter) {
    if (pathCounter < 50)  {
        this.enemy.animations.play('walking_left');
        this.enemy.body.velocity.x = -100; this.enemy.body.velocity.y = 0;
        this.facingEnemy = 'left';
    } else {
        this.enemy.animations.play('walking_right');
        this.enemy.body.velocity.x = 100; this.enemy.body.velocity.y = 0;
        this.facingEnemy = 'right';
    }

    //this.enemy.enemyText.destroy();
    //this.enemy.enemyText = this.game.add.text(this.enemy.body.x - 5, this.enemy.body.y - 30, this.enemyHp);
        if (this.shotTimerEnemy < this.game.time.now) {
        this.shotTimerEnemy = this.game.time.now + 2000;
        var fireball;
        if (this.facingEnemy == 'right') {
            fireball = this.fireballs.create(this.enemy.body.x + this.enemy.body.width / 2 + 45, this.enemy.body.y + this.enemy.body.height / 2 + 5, 'arrow-right');
        } else {
            fireball = this.fireballs.create(this.enemy.body.x + this.enemy.body.width / 2 - 40, this.enemy.body.y + this.enemy.body.height / 2 + 5, 'arrow-left');
        }
        this.game.physics.enable(fireball, Phaser.Physics.ARCADE);
        fireball.body.bounce.y = 1;
        fireball.outOfBoundsKill = true;
        fireball.anchor.setTo(0.5, 0.5);
        fireball.body.velocity.y = 0;
        if (this.facingEnemy == 'right') {
            fireball.body.velocity.x = 200;
        } else {
            fireball.body.velocity.x = -200;
        }
    }

};