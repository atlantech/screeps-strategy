const _ = require('lodash');

module.exports = {
  getGCL: function() {
    const rooms = _.uniq(Object.keys(Game.rooms));

    const my = rooms.filter(function(room) {
      return room.my;
    })

    return my.length;
  }
}
