var GameSetup = {
	preload: function() {
		game.load.image('background', './assets/images/riverWithTree2.png');
	},

	create: function() {
		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(2.79);

		var style = { font: "32px Arial", fill: "black", align: "center", backgroundColor: "#eef" };
		text = game.add.text(10, 50, "Welcome to the Oregon Trail", style);

	}
}