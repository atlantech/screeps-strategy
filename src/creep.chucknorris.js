var _ = require('lodash');

module.exports = {

    run: function(creep) {
        var enemies;

        enemies = creep.room.find(FIND_HOSTILE_CREEPS);

        if (enemies.length) {
            return this.attack(creep);
        }

        return this.harvest(creep);
    },

    harvest: function(creep) {
        var sources = creep.room.find(FIND_SOURCES_ACTIVE),
            storage, target, result;

        target = Memory.targetSources[creep.name];

        if (!target) {
            target = _.sample(sources);

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
    },

    attack: function(creep) {
        var target, result;

        target = this.getEnemy(creep);

        if (!target) {
            delete Memory.targetEnemies[creep.name];

            return;
        }

        result = creep.attack(target);

        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },

    getEnemy: function(creep) {
        var enemyId = Memory.targetEnemies[creep.name],
            enemies, enemy;

        if (!enemyId) {
            enemies = creep.room.find(FIND_HOSTILE_CREEPS);

            enemy = _.sample(enemies);

            if (enemy) {
                Memory.targetEnemies[creep.name] = enemy.id;
            }
        }

        return (enemy || Game.getObjectById(Memory.targetEnemies[creep.name]));
    }
};