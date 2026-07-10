class AnimationManager {
  constructor() {
    this.effects = [];
  }

  add(effect) {
    this.effects.push(effect);
  }

  update(dt) {
    this.effects.forEach(e => e.update(dt));
    this.effects = this.effects.filter(e => !e.isDone());
  }

  draw() {
    this.effects.forEach(e => e.draw());
  }
}
