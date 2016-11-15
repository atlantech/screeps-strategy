var _ = require('lodash');

// almighty 
var ChuckNorris = function(storag) {
    this.storage = storage;
};

module.exports = ChuckNorris;

// Bug. Chuck hasn't prototype
_.extend(ChuckNorris.prototype, {

    run: function(creep) {
        var enemies, action;

        enemies = creep.room.FIND_HOSTILE_CREEPS(FIND_HOSTILE_CREEPS);

        if (enemies.length) {
            return this.attack(creep);
        }

        action = this.getAction(creep);

        if (!action) {
            action = this.requestHarvestAction(creep);

            this.setAction(action);
        } else {
            if (action.name === 'harvest' && action.finished) {
                this.unsetAction(creep);

                action = this.requestUpgradeControllerAction(creep);
            }

            this.setAction(action);     

            return this.upgradeController(action, creep);
        }

        return this.harvest(action, creep);
    },

    requestUpgradeControllerAction: function(creep, target = null) {
        return {
            name: 'upgradeController',
            owner: creep.id,
            target: target,
            priority: 0x20,
            finished: false
        };
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

    setAction: function(action) {
        this.storage.actions[action.owner] = action;
    },

    unsetAction(owner) {
        delete this.storage.actions[owner.id];
    },

    getAction: function(owner) {
        return this.storage.actions[owner.id];
    },

    upgradeController: function() {
        // TODO
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
    },

    attack: function(creep) {
        var target, result;

        target = this.getEnemy(creep);

        if (!target) {
            delete this.storage.targetEnemies[creep.name];

            return;
        }

        result = creep.attack(target);

        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },

    getEnemy: function(creep) {
        var enemyId = this.storage.targetEnemies[creep.name],
            enemies, enemy;

        if (!enemyId) {
            enemies = creep.room.find(FIND_HOSTILE_CREEPS);

            enemy = _.sample(enemies);

            if (enemy) {
                this.storage.targetEnemies[creep.name] = enemy.id;
            }
        }

        return (enemy || Game.getObjectById(this.storage.targetEnemies[creep.name]));
    }
})
