var _ = require('lodash');

var chuck = require('creep.chucknorris'),
    spawn = require('structure.spawn');

module.exports.loop = function () {
    'use strict';

    spawn.run();

    _.each(Game.creeps, function(creep) {
        chuck.run(creep);
    });
};