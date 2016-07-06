var GameSetup = {
	preload: function() {
		game.load.image('background', './assets/images/riverWithTree2.png');
		game.load.image('black', './assets/images/blackScreen.png');
		game.load.spritesheet('bird', './assets/images/animeBirdFlyingSheet.png', 45, 45, 5);
		game.load.image('continue', './assets/images/continue-gray.png')
	},

	create: function() {
	    // plugin for text-input fields in canvas
	    game.add.plugin(Fabrique.Plugins.InputField);

	    this.animateTitle();
	    this.animateBird();
	    this.createNameInputs();
	    setTimeout(() => {this.continue()}, 4200)
	    
	},

	continue: function() {
		game.add.button(400, 320, 'continue', function(){
	    	this.state.start('Hunting');
	    }, this);
	},

  animateBird: function() {
		var bird = game.add.sprite(800, 200, 'bird');
		var fly = bird.animations.add('fly');

		//  30 is the frame rate (30fps)
		//  true means it will loop when it finishes
		bird.animations.play('fly', 10, true);

		game.physics.enable(bird, Phaser.Physics.ARCADE);

		bird.body.velocity.x = -150;
		bird.body.velocity.y = -15;
  },

  animateTitle: function() {
		// create background image to game
		background = game.add.sprite(0, 0, 'background');
		// scale background to fit game screen
		background.scale.setTo(2.79);

		// Styling stuff!
		var style = { font: "32px Arial", fill: "black", align: "center", backgroundColor: "#eef" };
		// create text 
		title = game.add.text(30, 0, "Welcome to the Oregon Trail", style);
		title.alpha = 0;
		title.scale.x = .4;
		title.scale.y = .4;

		// Create black overlay
		black = game.add.sprite(0, 0, 'black');
		// Fade the black overlay out
		game.add.tween(black).to({alpha: 0}, 2000, 'Linear', true, 0);

		setTimeout(function(){
			// Animating movement
			game.add.tween(title).to({
				x: 10,
				y: 50,
				alpha: 1,
			}, 2000, 'Linear', true, 0);

			// Animating scale
			game.add.tween(title.scale).to({
				x: 1,
				y: 1,
			}, 2000, 'Linear', true, 0);
		}, 1500);
  },

  createNameInputs: function() {
		setTimeout(function(){
      var nameInput = textInput(40, 200, 'Enter your name');
      var companion1 = textInput(40, 250, 'Enter companion 1');
      var companion2 = textInput(40, 280, 'Enter companion 2');
      var companion3 = textInput(40, 310, 'Enter companion 3');
      var companion4 = textInput(40, 340, 'Enter companion 4');
    }, 4000);
  }


}

// helper function for creating text inputs on canvas
function textInput(x, y, placeholder) {
  return game.add.inputField(x, y, {
    font: '18px Arial',
    fill: '#212121',
    fontWeight: 'bold',
    width: 200,
    height: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    placeHolder: placeholder
  });
}
