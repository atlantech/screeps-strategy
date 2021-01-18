module.exports = function harvest(creepName) {
  const creep = Game.creeps[creepName];

  const sources = creep.room.find(FIND_SOURCES_ACTIVE);

  let target = Memory.targetSources[creepName];

  let result;

  if (!target) {
    target = _.sample(sources);

    Memory.targetSources[creepName] = target.id;

    console.log('creep ' + creepName + ' gets target source ' + target.id);
  } else {
    target = Game.getObjectById(target);
  }

  if (target) {
    if (_.sum(creep.carry) === creep.carryCapacity) {
      const spawn = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_SPAWN
      }).pop();

      result = creep.transfer(spawn, RESOURCE_ENERGY);

      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }

      if (result === OK) {
        delete Memory.targetSources[creep.name];
      }

      return true;
    }

    result = creep.harvest(target);

    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }

    return false;
  }
}

