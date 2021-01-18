const Action = require('./action');
const utils = require('./utils')
const attack = require('./attack');
const harvest = require('./harvest');
const build = require('./build');
const upgradeController = require('./upgradeController');


module.exports = {
  allocateAction: function(creepName, onDone) {
    const creep = Game.creeps[creepName];

    const enemies = creep.room.find(FIND_HOSTILE_CREEPS);

    if (enemies.length) {
      return new Action('Attack enemy', creepName, attack, onDone);
    }

    if(!creep.room.storage) {
      const containers = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTAINER
      });

      if (!containers.length) {
        const structureType = creep.room.controller.level < 3 ? STRUCTURE_CONTAINER : STRUCTURE_STORAGE;

        return new Action('Build', creepName, build, onDone, {
          structureType
        })
      }
    }

    return new Action('Upgrade controller', creepName, upgradeController);
  }
}
