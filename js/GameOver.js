BasicGame.GameOver = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.GameOver.prototype = {

    init: function(customParam1, customParam2) {
   },

	create: function () {
		console.log('GAMEOVR');
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('BGS1');
		//this.music.play('',0,0.4,true, false);



		this.game.add.text(game_width/2-50,game_height/2 - 50, 'U R DEAD, U NUB.', { font: "13px Arial", fill: "#FFF", align: "center" })
		this.playButton = this.add.button(game_width/2,game_height/2,  'heart', this.startGame, this);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		BasicGame.playerHp = 5;
		BasicGame.damage = 5;
		this.state.start('Game');

	}

};