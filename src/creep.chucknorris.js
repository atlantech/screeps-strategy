var _ = require('lodash');

module.exports = {

    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE),
            storage, target, result;

        target = Memory.targetSources[creep.name];

        if (!target) {
            target = _.shuffle(sources)[0];

            Memory.targetSources[creep.name] = target.id;

            console.log('creep ' + creep.name + ' gets target source ' + target.id);
        } else {
            target = Game.getObjectById(target);
        }


        if (target) {
            if (_.sum(creep.carry) === creep.carryCapacity) {
                storage = Game.spawns['Spawn1'];

                result = creep.transfer(storage, RESOURCE_ENERGY);

                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }

                if (result === OK) {
                    delete Memory.targetSources[creep.name];
                }

                return;
            }

            result = creep.harvest(target);

            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};