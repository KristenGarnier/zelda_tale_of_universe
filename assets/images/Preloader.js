BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};
BasicGame.Preloader.prototype = {

	preload: function () {
		console.log("space Mother fucker")
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(game_width/4,game_height/4, 'preloaderBackground');
		this.preloadBar = this.add.sprite(game_width/4,game_height/ 4, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'images/title.jpg');
		this.game.load.tilemap('map', 'assets/map/map2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map_maison', 'assets/map/Maison_double.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('donjon', 'assets/map/donjon.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tiles', 'assets/map/tile.png');
		this.game.load.image('sky', 'assets/images/map6.png');
		this.game.load.image('MaisonDouble', 'assets/images/maison_doublee.png');
		this.game.load.image('donjon_img', 'assets/images/donjon.png');
		this.game.load.spritesheet('dude', 'assets/sprites/link-blue.png', 30, 24);
		this.game.load.spritesheet('monster', 'assets/sprites/baddie.png', 32, 32);
		this.game.load.spritesheet('tbears', 'assets/sprites/T-bears.png', 55, 32);
		this.game.load.spritesheet('Boss', 'assets/sprites/finalBoss.png', 64, 64);
		this.game.load.image('arrow-right', 'assets/images/arrow-right.png');
		this.game.load.image('arrow-left', 'assets/images/arrow-left.png');
		this.game.load.image('arrow-up', 'assets/images/arrow-up.png');
		this.game.load.image('arrow-down', 'assets/images/arrow-down.png');
		this.game.load.image('heart', 'assets/images/heart.png');
		this.game.load.image('level', 'assets/images/niv_chang.png');
		this.game.load.image('upAttack', 'assets/images/attackUp.png');
		this.game.load.spritesheet('death-link', 'assets/sprites/death-zelda.png', 25, 24);
		this.game.load.audio("run", "assets/Sound/Steps_Dirt.wav");
		this.game.load.audio("die", "assets/Sound/Link_KnockDown2.wav");
		this.game.load.audio("hurt", "assets/Sound/Link_Hurt2.wav");
		this.game.load.audio("shoot", "assets/Sound/Arrow_Shoot.wav");
		this.game.load.audio("hit", "assets/Sound/Arrow_Hit.wav");
		this.game.load.audio("rupeeSound", "assets/Sound/Get_Rupee.wav");
		this.game.load.audio("heartSound", "assets/Sound/Get_Heart.wav");
		this.game.load.audio("die_enemy", "assets/Sound/die_enemy.wav");
		this.game.load.audio("BGS1", "assets/Sound/hyrulefield.mp3");
		this.game.load.audio("BGS2", "assets/Sound/kakariko.mp3");
		this.game.load.audio("ARRY", "assets/Sound/Jingle_ascenseur_01.mp3");
		this.game.load.audio("menu", "assets/Sound/main_menu.mp3");
		this.game.load.audio("house", "assets/Sound/house.mp3");
		this.game.load.audio("cave", "assets/Sound/cave.mp3");
		this.game.load.audio("credit", "assets/Sound/credit.mp3");
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('menu') && this.ready == false)
		{
			//this.ready = true;
			this.state.start('MainMenu');
		}

	}

};