var _ = require('lodash');

var spawn = require('structure.spawn');

    Memory.targetSources = Memory.targetSources || {};
    Memory.targetEnemies = Memory.targetEnemies || {};
    Memory.actions = Memory.actions || {};

const strategy = require('./strategy');

Room.prototype.getController = function() {
    const controllers = this.pos.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTROLLER
    });

    return controllers.pop();
}

module.exports.loop = function () {
    spawn.run();

    _.each(Game.creeps, function(creep) {
        let action = Memory.actions[creep];

        const onDone = function() {
            console.info(`Creep ${action.getCreep()} finished action ${action.getName()}`)

            delete Memory.actions[creep];
        }

        if (!action) {
            // allocates and immediately starts an action?
            action = strategy.allocateAction(creep, onDone);

            Memory.actions[creep] = action;
        }

        const done = action.run();

        if (done) {
            onDone()
        }
    });
};
