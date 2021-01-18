const Action = require('./action');
const utils = require('./utils')
const attack = require('./tasks/attack');
const harvest = require('./tasks/harvest');
const build = require('./tasks/build');
const upgradeController = require('./tasks/upgradeController');


module.exports = {
  allocateAction: function(creep, onDone) {
    const enemies = creep.room.find(FIND_HOSTILE_CREEPS);

    if (enemies.length) {
      return new Action('Attack enemy', creep, attack, onDone);
    }

    if(!creep.room.storage) {
      const containers = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTAINER
      });

      if (!containers.length) {
        const structureType = creep.room.controller.level < 3 ? STRUCTURE_CONTAINER : STRUCTURE_STORAGE;

        return new Action('Build', creep, build, onDone, {
          structureType
        })
      }
    }

    return new Action('Upgrade controller', creep, upgradeController());
  }
}
