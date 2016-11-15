var Action = function(owner, storage) {
	this.owner = owner;
	this.storage = storage;
	this.isNew = true;
}

//TODO Action prototype
Action.prototype.save = function() {
	this.storage.actions[this.owner.id] = {
		name: this.getName(),
		priority: this.getPriority(),
		finished: this.isFinished(),
		ownerId: this.getOwnerId(),
		targetId: this.getTargetId(),
	};

	this.isNew = false;
};

Action.prototype.serialize = function() {
	// TODO return action configuration
}

Action.prototype.getPriority = function() {
	return this.priority;
}

module.exports = Action;