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

    if(result === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }

    if (OK === result) {
      return true;
    }
  }

  return false;
}
