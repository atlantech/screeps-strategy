var _ = require('lodash');

var Base = require('./creep.base');

var Harvester = function(storage) {
	Base.call(this, arguments);
}

Harvester.prototype = _.extend(Harvester.prototype, Base.prototype {

	run: function() {
		// TODO
	},

    requestHarvestAction: function(creep, target = null) {
        return {
            name: 'harvest',
            owner: creep.id,
            target: target,
            priority: 0x10,
            finished: false
        };
    },

    harvest: function(action, creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE),
            storage, target, result, action;

        target = action.target;

        if (!target) {
            target = _.sample(sources);

            action = this.requestHarvestAction(creep, target);

            this.setAction(action);

            creep.say('harvesting ' + target.id);
        }

        if (_.sum(creep.carry) === creep.carryCapacity) {
            storage = Game.spawns['Spawn1'];

            result = creep.transfer(storage, RESOURCE_ENERGY);

            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }

            if (result === OK) {
                delete this.storage.targetSources[creep.name];
            }

            return;
        }

        result = creep.harvest(target);

        if (result === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }

});