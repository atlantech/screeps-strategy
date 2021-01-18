function getEnemy(creep) {
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

module.exports = function attack(creepName) {
  const creep = Game.creeps[creep];

  const target = getEnemy(creep);

  if (!target) {
    delete Memory.targetEnemies[creep.name];

    return true;
  }

  const result = creep.attack(target);

  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);

    return false;
  }

  return true;
}
