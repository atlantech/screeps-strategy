const harvest = require('./harvest');

const ACTION = 'BUILD';

module.exports = function build(creepName, {structureType}) {
  const creep = Game.creeps[creepName];

  let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (!target) {
    let x = 0, y = 0;

    let result = creep.room.createConstructionSite(x,y, structureType);

    while(OK !== result) {
      x+=1;
      y+=1;

      result = creep.room.createConstructionSite(x,y, structureType);
    }

    target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  }

  if (target) {
    const result = creep.build(target, structureType);

    console.log(`${ACTION} result: ${result}`);

    if (result === ERR_NOT_ENOUGH_RESOURCES) {
      return harvest(creepName);
    }

    if(result === ERR_NOT_IN_RANGE) {
      console.log(`Creep ${creepName}, action ${ACTION}, moving to ${target}`);

      creep.moveTo(target);
    }

    if (OK === result) {
      return true;
    }
  }

  return false;
}
