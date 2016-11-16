var _ = require('lodash');

var BaseCreep = function(storage) {
	this.storage = storage;
}

module.exports = BaseCreep;

BaseCreep.prototype = _.extend(BaseCreep.prototype , {

    setAction: function(action) {
        this.storage.actions[action.owner] = action;
    },

    unsetAction(owner) {
        delete this.storage.actions[owner.id];
    },

    getAction: function(owner) {
        return this.storage.actions[owner.id];
    },

});