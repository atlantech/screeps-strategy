var _ = require('lodash');

module.exports = {
    run: function() {
        if (Object.keys(Game.creeps).length < 4) {
            _.each(Game.spawns, function (spawn) {
                const result = spawn.spawnCreep([MOVE, WORK, CARRY, ATTACK]);

                if ('OK' === result) {
                    console.error('Error spawning creep', result);
                }
            });
        }
    }
};
