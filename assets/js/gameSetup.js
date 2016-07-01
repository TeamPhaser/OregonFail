var GameSetup = {
	preload: function() {
		game.load.image('background', './assets/images/riverWithTree2.png');
		game.load.image('black', './assets/images/blackScreen.png');
		game.load.spritesheet('bird', './assets/images/animeBirdFlyingSheet.png', 45, 45, 5);
	},

	create: function() {
		// create background image to game
		background = game.add.sprite(0, 0, 'background');
		// scale background to fit game screen
		background.scale.setTo(2.79);

		// Styling stuff!
		var style = { font: "32px Arial", fill: "black", align: "center", backgroundColor: "#eef" };
		// create text 
		text = game.add.text(30, 0, "Welcome to the Oregon Trail", style);
		text.alpha = 0;
		text.scale.x = .4;
		text.scale.y = .4;

		// Create black overlay
		black = game.add.sprite(0, 0, 'black');
		// Fade the black overlay out
		game.add.tween(black).to({alpha: 0}, 2000, 'Linear', true, 0);

		setTimeout(function(){
			// Animating movement
			game.add.tween(text).to({
				x: 10,
				y: 50,
				alpha: 1,
			}, 2000, 'Linear', true, 0);

			// Animating scale
			game.add.tween(text.scale).to({
				x: 1,
				y: 1,
			}, 2000, 'Linear', true, 0);
		}, 1500);

		var bird = game.add.sprite(800, 200, 'bird');
		var fly = bird.animations.add('fly');

		//  30 is the frame rate (30fps)
		//  true means it will loop when it finishes
		bird.animations.play('fly', 10, true);

		game.physics.enable(bird, Phaser.Physics.ARCADE);

		bird.body.velocity.x = -150;
		bird.body.velocity.y = -15;
	}
}

