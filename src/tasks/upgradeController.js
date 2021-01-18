const harvest = require('./harvest');

module.exports = function upgradeController(creepName) {
  const creep = Game.creeps[creep];

  if(creep.room.controller) {
    const result = creep.upgradeController(creep.room.controller);

    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);

      return false;
    }

    if (result === ERR_NOT_ENOUGH_RESOURCES) {
      return harvest(creepName);
    }
  }

  return true;
}
