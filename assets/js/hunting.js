var cursors
var currentSpeed = 0;
var hunter;
var bullet;
var fireRate = 420;
var nextFire = 0;
var enemies;
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;
var explosions;
var buffalo;
var wasd;
var land;

EnemyBuffalo = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.alive = true;

    this.buffalo = game.add.sprite(x, y, 'enemy');

    this.buffalo.anchor.set(0.5);

    this.buffalo.name = index.toString();
    game.physics.enable(this.buffalo, Phaser.Physics.ARCADE);
    this.buffalo.body.immovable = false;
    this.buffalo.body.collideWorldBounds = true;
    this.buffalo.body.bounce.setTo(1, 1);
    this.buffalo.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.buffalo.rotation, 100, this.buffalo.body.velocity);
};

EnemyBuffalo.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0) {
        this.alive = false;
        this.buffalo.kill();
        
        return true;
    }

    return false;
};

var Hunting = {

    preload: function () {
        game.load.image('enemy', './assets/images/Buffalo.png');
        game.load.image('mushroom', './assets/images/patrick.png');
        game.load.image('background', './assets/images/huntingGrounds.png')
        game.load.image('bullet', './assets/images/bullet.gif');
    },

    create: function () {

        game.world.setBounds(-1000, -1000, 2000, 2000);

        land = game.add.tileSprite(0, 0, 600, 450, 'background');
        land.fixedToCamera = true;

        //  The base of our hunter
        hunter = game.add.sprite(200, 200, 'mushroom');
        hunter.anchor.setTo(0.5, 0.5);
        
        //  This will force it to decelerate and limit its speed
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        //  Create some baddies to waste :)
        enemies = [];

        enemiesTotal = 20;
        enemiesAlive = 20;

        for (var i = 0; i < enemiesTotal; i++) {
            enemies.push(new EnemyBuffalo(i, game, buffalo));
        }

        //  Make things a bit more bouncey
        game.physics.p2.defaultRestitution = 0.8;

        //  Enable if for physics. This creates a default rectangular body.
        game.physics.p2.enable(hunter);

        //  Modify a few body properties
        hunter.body.setZeroDamping();
        hunter.body.fixedRotation = true;


        cursors = game.input.keyboard.createCursorKeys();

        wasd = {
          up: game.input.keyboard.addKey(Phaser.Keyboard.W),
          down: game.input.keyboard.addKey(Phaser.Keyboard.S),
          left: game.input.keyboard.addKey(Phaser.Keyboard.A),
          right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };

        game.camera.follow(hunter);
        game.camera.deadzone = new Phaser.Rectangle(150, 150, 300, 175);
        game.camera.focusOnXY(0, 0);

    },

    removeLogo: function () {

    },

    update: function() {

        game.physics.arcade.overlap(buffalo, null, this);

        enemiesAlive = 0;

        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].alive) {
                enemiesAlive++;
                game.physics.arcade.collide(buffalo, enemies[i].buffalo);
                game.physics.arcade.overlap(bullets, enemies[i].buffalo, this.bulletHitEnemy, null, this);
            }
        }

        hunter.body.setZeroVelocity();

        if (cursors.left.isDown || wasd.left.isDown) {
            hunter.body.moveLeft(250);
        } else if (cursors.right.isDown || wasd.right.isDown) {
            hunter.body.moveRight(250);
        }

        if (cursors.up.isDown || wasd.up.isDown) {
            hunter.body.moveUp(250);
        } else if (cursors.down.isDown || wasd.down.isDown) {
            hunter.body.moveDown(250);
        }
        if (game.input.activePointer.isDown) {
            this.fire();
        }

        land.tilePosition.x = -game.camera.x;
        land.tilePosition.y = -game.camera.y;
    },

    bulletHitEnemy: function (buffalo, bullet) {
        bullet.kill();

        var destroyed = enemies[buffalo.name].damage();

    },

    fire: function () {
        if (game.time.now > nextFire && bullets.countDead() > 0) {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(hunter.x - 8, hunter.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }

    },

    render: function () {

    }
}