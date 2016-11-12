var _ = require('lodash');

module.exports = {

    run: function() {
        _.each(Game.spawns, function (spawn) {
            spawn.createCreep([MOVE, WORK, CARRY, ATTACK]);
        });
    }
};