var game;

game = new Phaser.Game(600, 450, Phaser.AUTO, '')

game.state.add('Menu', Menu);
game.state.add('GameSetup', GameSetup);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.add('Hunting', Hunting);

game.state.start('Menu')
