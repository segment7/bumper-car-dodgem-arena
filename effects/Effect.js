// Shared lifecycle for one-shot visual effects (ImpactFlash, BarrierPulse).
class Effect {
  constructor(pos, lifespanMs) {
    this.pos = { x: pos.x, y: pos.y };
    this.age = 0;
    this.lifespan = lifespanMs;
  }

  update(dt) {
    this.age += dt;
  }

  isDone() {
    return this.age >= this.lifespan;
  }

  progress() {
    return constrain(this.age / this.lifespan, 0, 1);
  }

  draw() {}
}
