var _ = require('lodash');

var Base = require('./creep.base');

// almighty 
var ChuckNorris = function(storage) {
    Base.call(this, arguments);
};

module.exports = ChuckNorris;

// Bug. Chuck hasn't prototype
ChuckNorris.prototype = _.extend(ChuckNorris.prototype, Base.prototype {

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

    upgradeController: function() {
        // TODO
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
