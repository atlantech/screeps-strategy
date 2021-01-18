class Action {
  constructor(name, creep, task, onDone, opts) {
    this.name = name;
    this.creep = creep;
    this.task = task;
    this.onDone = onDone;
    this.opts = opts;
  }

  getName() {
    return this.name;
  }

  getCreep() {
    return this.creep;
  }

  run() {
    if (this.task) {
      const done = this.task(this.creep, this.opts);

      if (done) {
        this.onDone();
      }

      return done;
    }

    console.error(`No task assigned to action ${this.name}, creep name`, this.creep);

    this.onDone();

    return true;
  }

}

module.exports = Action;
