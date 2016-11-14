var _ = require('lodash');

var chuck = require('creep.chucknorris'),
    spawn = require('structure.spawn');

    Memory.targetSources = Memory.targetSources || {};
    Memory.targetEnemies = Memory.targetEnemies || {};

module.exports.loop = function () {
    'use strict';

    spawn.run();

    _.each(Game.creeps, function(creep) {
        chuck.run(creep);
    });
};