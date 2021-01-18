var _ = require('lodash');

const spawn = require('structure.spawn');
const strategy = require('./strategy');

Memory.targetSources = Memory.targetSources || {};
Memory.targetEnemies = Memory.targetEnemies || {};

const actions = {}

Room.prototype.getController = function() {
    const controllers = this.pos.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTROLLER
    });

    return controllers.pop();
}

module.exports.loop = function () {
    spawn.run();

    _.each(Game.creeps, function(creep) {
        const creepName = creep.name;

        let action = actions[creepName];

        const onDone = function() {
            console.log(`Creep ${action.getCreep()} finished action ${action.getName()}`)

            delete actions[creepName];
        }

        if (!action) {
            // allocates and immediately starts an action?
            action = strategy.allocateAction(creepName, onDone);

            actions[creepName] = action;
        }

        const done = action.run();

        if (done) {
            onDone()
        }
    });
};
