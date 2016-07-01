var GameSetup = {
	preload: function() {
		game.load.image('background', './assets/images/riverWithTree2.png');
		game.load.image('black', './assets/images/blackScreen.png');
	},

	create: function() {
    // plugin for text-input fields in canvas
    game.add.plugin(Fabrique.Plugins.InputField);

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

    var nameInput = textInput(40, 200, 'Enter your name');
    var companion1 = textInput(40, 250, 'Enter companion 1');
    var companion2 = textInput(40, 280, 'Enter companion 2');
    var companion3 = textInput(40, 310, 'Enter companion 3');
    var companion4 = textInput(40, 340, 'Enter companion 4');
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
