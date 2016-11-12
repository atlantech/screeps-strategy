var _ = require('lodash');

module.exports = {

    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE),
            storage;

        if (target) {
            if (_.sum(creep.carry) === creep.carryCapacity) {
                storage = Game.spawns['Spawn1'];

                if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }

                return;
            }

            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};