BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.game.add.sprite(0, 0, 'fondMenu');
		this.logo = this.game.add.sprite(game_width/2,game_height/2.5, 'logo');
		this.logo = this.logo.anchor.set(0.5);
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('menu');
		this.music.play('',0,1,true, false);
		this.playButton = this.add.button(game_width/2,game_height/1.2,  'startGame', this.startGame, this);
		this.playButton = this.playButton.anchor.set(0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.music.stop();
		this.state.start('Game');

	}

};