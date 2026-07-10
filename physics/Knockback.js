// Extension - Brief post-collision pause of the car's controller/trail. 
// I designed this to strengthen real-world simulation.
class Knockback {
  constructor() {
    this.active = false;
    this.timer = 0;
    this.onComplete = null;
  }

  trigger(onComplete) {
    this.active = true;
    this.timer = 0;
    this.onComplete = onComplete;
  }

  update(dt) {
    if (!this.active) return;
    this.timer += dt;
    if (this.timer >= KNOCKBACK_PAUSE_MS) {
      this.active = false;
      const callback = this.onComplete;
      this.onComplete = null;
      if (callback) callback();
    }
  }

  isActive() {
    return this.active;
  }
}
