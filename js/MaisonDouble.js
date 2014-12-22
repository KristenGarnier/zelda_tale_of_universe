
BasicGame.MaisonDouble = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.MaisonDouble.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //  We're going to be using physics, so enable the Arcade Physics system@
    this.game.world.setBounds(0, 0, 496, 240);
    //  A simple background for our game
    this.map = this.game.add.tilemap('map_maison');
    this.map.addTilesetImage('tiles');
    this.layerMap = this.map.createLayer('mur');
    //this.layerMap.resizeWorld();
    this.map.setCollision(1);
    this.game.add.sprite(0, 0, 'MaisonDouble');


    this.rupeeSound = this.game.add.audio('rupeeSound');
    this.heartSound = this.game.add.audio('heartSound');
    this.link_run = this.game.add.audio('run');
    this.link_death = this.game.add.audio('die');
    this.link_hurt = this.game.add.audio('hurt');
    this.arrow_shoot = this.game.add.audio('shoot');
    this.arrow_hit = this.game.add.audio('hit');
    this.die_enemy = this.game.add.audio('die_enemy');
    this.ARRY = this.game.add.audio('ARRY');
    this.house = this.game.add.audio('house');
    this.house.play('',0,0.3,true,false);

    this.niv_chg = this.game.add.group();
    this.niv_chg.enableBody = true;
        var chng = this.niv_chg.create(422,183, 'level');
        //var chng = this.niv_chg.create(280,300, 'level');


    this.heart = this.game.add.group();
    this.heart.enableBody = true;

    var hearts = this.heart.create(412,42, 'heart');
    var hearts = this.heart.create(412,50, 'heart');
    var hearts = this.heart.create(420,50, 'heart');

    /*this.upAttack = this.game.add.group();
    this.upAttack.enableBody = true;

    var upAttacks = this.upAttack.create(200, 300, 'upAttack');*/


    this.arrow = this.game.add.group();
    this.game.physics.enable(this.arrow,Phaser.Physics.ARCADE);
    this.fireballs = this.game.add.group();
    this.game.physics.enable(this.fireballs, Phaser.Physics.ARCADE);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    /*this.enemies = [];

    this.enemiesTotal = 10;
    this.enemiesAlive = 10;

        this.enemies.push(new EnemyMonster(0, this.game, this.player, this.fireballs,440,122));//
        this.enemies.push(new FinalBoss(1, this.game, this.player, this.fireballs,1259,1486));
        this.enemies.push(new EnemyMonster(2, this.game, this.player, this.fireballs,815,1400));
        this.enemies.push(new EnemyMonster(3, this.game, this.player, this.fireballs,1275,535));
        this.enemies.push(new EnemyMonster(4, this.game, this.player, this.fireballs,800,155));//
        this.enemies.push(new EnemyMonster(5, this.game, this.player, this.fireballs,787,538));
        this.enemies.push(new EnemyMonster(6, this.game, this.player, this.fireballs,750,910));
        this.enemies.push(new EnemyMonster(7, this.game, this.player, this.fireballs,440,122));//
        this.enemies.push(new EnemyMonster(8, this.game, this.player, this.fireballs,166,518));//
        this.enemies.push(new enemyStrong(9, this.game, this.player, this.fireballs,1379,1150));

    */

    //  We will enable physics for any object that is created in this group

    // Here we create the ground.

    //  Now let's create two ledges

    // The player and its settings
    this.player = this.game.add.sprite(150,180, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.BGS1_play = 0;
    //this.playerHp = 5;
    BasicGame.damage = 5;
    this.shotTimer = 0;
    this.deathCounter = 0;


    //  Player physics properties. Give the little guy a slight bounce.

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [20,21,22,23,24,25,26,27,28,29], 15, true);
    this.player.animations.add('right', [30,31,32,33,34,35,36,37,38,39], 15, true);
    this.player.animations.add('up', [10,11,12,13,14,15,16,17,18,19], 15, true);
    this.player.animations.add('down', [0,1,2,3,4,5,6,7,8,9], 15, true);
    this.player.animations.add('attack-left', [40,41,42,43,44,45], 7, true);
    this.player.animations.add('attack-right', [46,47,48,49,50,51], 7, true);
    this.player.animations.add('attack-down', [52,53,54,55,56,57], 7, true);
    this.player.animations.add('attack-up', [58,59,60,61,62,63], 7, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.attack = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.camera.follow(this.player);

},

update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.game.physics.arcade.collide(this.player, this.layerMap);
        this.game.physics.arcade.collide(this.arrow, this.layerMap, this.killFireball);
        this.game.physics.arcade.collide(this.heart, this.layerMap);
        //this.game.physics.arcade.collide(this.upAttack, this.layerMap);
        this.game.physics.arcade.collide(this.niv_chg, this.layerMap);
        this.game.physics.arcade.collide(this.fireballs, this.layerMap, this.killFireball);
        this.game.physics.arcade.overlap(this.player, this.heart, this.gainLife, null, this);
        this.game.physics.arcade.overlap(this.player, this.niv_chg, this.redirection_niv, null, this);
        //this.game.physics.arcade.overlap(this.player, this.upAttack, this.gainAttack, null, this);
        //this.game.physics.arcade.collide(this.fireballs, this.player, this.hitPlayer, null, this);

        /*for (var i = 0; i < this.enemies.length; i++)
        {
            if (this.enemies[i].alive)
            {
                this.enemiesAlive++;
                this.game.physics.arcade.collide(this.player, this.enemies[i].enemy);
                this.game.physics.arcade.collide(this.enemies[i].enemy, this.layerMap);
                this.game.physics.arcade.overlap(this.arrow, this.enemies[i].enemy, this.hitEnemy, null, this);
                this.enemies[i].pathCounter += 1;
                if (this.enemies[i].pathCounter >= 100) {
                    this.enemies[i].pathCounter = 0;
                }
                this.enemies[i].update(this.enemies[i].pathCounter);
            }
        }*/
    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if (BasicGame.playerHp > 0) {

        this.updatePlayerHP();
    }
    if (BasicGame.playerHp <= 0) {
        if (this.deathCounter == 0) {
            this.playerDies();
        };

    }

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
        this.link_run.play('',0,0.4,false,false);
        this.facing = 'left';
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
        this.link_run.play('',0,0.4,false,false);
        this.facing = 'right';
    }
    else if (this.cursors.up.isDown)
    {
        //  Move to the right
        this.player.body.velocity.y = -150;

        this.player.animations.play('up');
        this.link_run.play('',0,0.4,false,false);
        this.facing = 'up';
    }
    else if (this.cursors.down.isDown)
    {
        //  Move to the right
        this.player.body.velocity.y = 150;

        this.player.animations.play('down');
        this.link_run.play('',0,0.4,false,false);
        this.facing = 'down';
    }
    else if (this.attack.isDown)
    {
        //  Move to the right
        if (this.facing == 'up') {
            this.player.animations.play('attack-up', 6 ,false,false);
            this.player.events.onAnimationComplete.add(function(){
                this.shoot();
            }, this);
        }
        else if (this.facing == 'down') {
            this.player.animations.play('attack-down', 6 ,false,false);
            this.player.events.onAnimationComplete.add(function(){
                this.shoot();
            }, this);
        }
        else if (this.facing == 'left') {
            this.player.animations.play('attack-left', 6 ,false,false);
            this.player.events.onAnimationComplete.add(function(){
                this.shoot();
            }, this);

        }
        else {
            this.player.animations.play('attack-right', 6 ,false,false);
            this.player.events.onAnimationComplete.add(function(){
                this.shoot();
            }, this);
        }
    }
    else
    {
        //  Stand still
        this.player.animations.stop();
        if (this.facing == "up") {
            this.player.frame = 10;
        }
        else if (this.facing == "down"){
            this.player.frame = 0;
        }
        else if (this.facing == "left"){
            this.player.frame = 20;
        }
        else if (this.facing == "right"){
            this.player.frame = 39;
        }
        else {
            this.player.frame = 0;
        }
    }
},

gainLife: function (player, hearts) {

    // Removes the star from the screen
    hearts.kill();
    if (BasicGame.playerHp < 5) {
        BasicGame.playerHp+=1;
    };
    this.heartSound.play('',0,0.2,false,false);

},

gainAttack: function (player, attackUp) {
    attackUp.kill();
    var xpGained= 30;
    this.testLvl(xpGained);
    this.rupeeSound.play('',0,0.2,false,false);


},

shoot: function () {
    if (this.shotTimer < this.game.time.now) {
        this.shotTimer = this.game.time.now;

        var arrows;
        if (this.facing == 'right') {
            arrows = this.arrow.create(this.player.body.x + this.player.body.width / 2 + 20, this.player.body.y + this.player.body.height / 2 - 4, 'arrow-right');
            this.arrow_shoot.play('',0,1,false,false);
        } else if(this.facing == 'left') {
            arrows = this.arrow.create(this.player.body.x + this.player.body.width / 2 - 20, this.player.body.y + this.player.body.height / 2 - 4, 'arrow-left');
            this.arrow_shoot.play('',0,1,false,false);
        }
        else if(this.facing == 'up') {
            arrows = this.arrow.create(this.player.body.x + this.player.body.width / 2 , this.player.body.y + this.player.body.height / 2 - 20, 'arrow-up');
            this.arrow_shoot.play('',0,1,false,false);
        }
        else {
            arrows = this.arrow.create(this.player.body.x + this.player.body.width / 2 , this.player.body.y + this.player.body.height / 2 + 20, 'arrow-down');
            this.arrow_shoot.play('',0,1,false,false);
        }
        this.game.physics.enable(this.arrow, Phaser.Physics.ARCADE);
        arrows.outOfBoundsKill = true;
        arrows.anchor.setTo(0.5, 0.5);
        arrows.body.velocity.y = 0;
        if (this.facing == 'right') {
            arrows.body.velocity.x = 200;
        } else if (this.facing == 'left') {
            arrows.body.velocity.x = -200;
        } else if (this.facing == 'up') {
            arrows.body.velocity.y = -200;
        } else {
            arrows.body.velocity.y = 200;
        }
    }
},


updatePlayerHP: function () {
    if (BasicGame.playerHp <= 2) {
        $("#life").addClass('red');
    };
    if (BasicGame.playerHp > 2) {
        $("#life").removeClass('red');
    };
    $( "#life" ).empty();
    var life  = (BasicGame.playerHp / 5) * 100;
    life = 'width:'+life+'%';
    var xpValue = 'width:'+BasicGame.xp+'%';
    $( "#life" ).attr('style',life);
    $( "#xp" ).attr('style',xpValue);
    $("#life").append(BasicGame.playerHp + " Hp");
    $( ".damage" ).empty();
    $(".damage").append(BasicGame.damage + " DMG");
    $( "#xp" ).empty();
    $("#xp").append(BasicGame.xp + " XP");
    $( ".lvl" ).empty();
    $(".lvl").append("LVL."+BasicGame.level);
},

hitEnemy: function (enemy,arrow) {
    var degats = BasicGame.damage;
    arrow.kill();
    this.arrow_hit.play('',0,1,false,false);
    var destroyed = this.enemies[enemy.name].damage(degats);
    if (destroyed)
    {
        this.hearts = this.heart.create(enemy.x +10, enemy.y-2, 'heart');
        this.upAttacks = this.upAttack.create(enemy.x -10, enemy.y+2, 'upAttack');
        enemy.kill();
        //enemy.enemyText.destroy();
        this.die_enemy.play('',0,0.5,false,false);
        this.ARRY.play('',0,1,false,false);
        $( ".dropdown-menu li span" ).empty();

        BasicGame.monsterKill += 1;
        if (BasicGame.monsterKill == 2) {
            alert("Vous avez complété la quete 1")
            $( ".dropdown-menu li" ).remove();
            BasicGame.level += 1;
            this.levelUp(BasicGame.level);
        }else {
            var killed = BasicGame.monsterKill + "/2";
            $( ".dropdown-menu li span" ).append(killed);
        }
    }
},
hitPlayer: function (player,fireball) {
    fireball.kill();
    BasicGame.playerHp -= this.enemies[0].dammage;
    this.link_hurt.play('',0,1,false,false);
},

playerDies :function () {
    this.player.kill();
    $( "#life" ).empty();
    $( "#life" ).attr('style', "width:0%;");
    $("#life").append("0Hp");
    $( ".life" ).empty();
    $( ".life" ).append("Vous êtes mort");
    this.link_death.play('',0,1,false,false);
    this.deathCounter = 1;
    this.Death();



},

killFireball: function (fireball, block) {
    fireball.kill()
},

redirection_niv: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.player.body.x = 0;
        this.player.body.x = 0;
        this.house.stop();
        this.state.start('Game');

    },
    Death: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.house.stop();
        //this.doorSound.play('',0,1,false,false);
        //  Then let's go to the Cave.
        this.state.start('GameOver');

    },

    testLvl: function(xpGained){
    var xpRecieve = BasicGame.xp + xpGained;
    if (xpRecieve < 99) {
        BasicGame.xp += xpGained;
    }else {
        var newXp = (BasicGame.xp + xpGained) - 100;
        BasicGame.xp = newXp;
        BasicGame.level += 1;
        this.levelUp(BasicGame.level);
    }
},

    levelUp: function(level){
        switch (level) {
            case 0:
            BasicGame.damage = 5;
            break;
            case 1:
            BasicGame.damage = 7;
            break;
            case 2:
            BasicGame.damage = 9;
            break;
            case 3:
            BasicGame.damage = 12;
            break;
            case 4:
            BasicGame.damage = 16;
            break;
            case 5:
            BasicGame.damage = 22;
            break;
            case 6:
            BasicGame.damage = 30;
            break;
        }
    }

};