// Brief post-collision state: adds an extra axial velocity nudge (matter.js's
// own restitution/mass already handles the base separation), then suspends
// the car's controller/trail for a short window before handing back control.
class Knockback {
  constructor() {
    this.active = false;
    this.timer = 0;
    this.onComplete = null;
  }

  trigger(body, normal, isAxial, onComplete) {
    if (isAxial) {
      Matter.Body.setVelocity(body, {
        x: body.velocity.x + normal.x * AXIAL_BOOST,
        y: body.velocity.y + normal.y * AXIAL_BOOST
      });
    }
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
