var party = [];

class Person {
    constructor (name) {
        this.name = name;
    }
}

var Game = {

    preload : function() {

    },

    create : function() {
        this.initMain()
    },

    initMain: function() {
        var style = { font: "bold 32px Arial", fill: "#fff", align: "center" }

        t_location = game.add.text(game.world.centerX, 0, 'Shaboygan City', style);
        t_date = game.add.text(game.world.centerX, 10, 'April 8, 1848', style);
    },

    createParty: function() {
        let names = [
            'Caleb',
            'Jordan',
            'Kenny',
            'Amanda',
            'David'
        ]
        for(let i = 0; i < 5; i++){
            party.push(new Person(names[i]))
        }
    }
};