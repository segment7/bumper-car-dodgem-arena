// Per-car fading trail, scaled by speed and paused during knockback.
class MotionTrail {
  constructor(car) {
    this.car = car;
    this.points = [];
    this.paused = false;
  }

  pause() {
    this.paused = true;
    this.points = [];
  }

  resume() {
    this.paused = false;
  }

  update(pos, velocity) {
    if (this.paused) return;

    const speed = Matter.Vector.magnitude(velocity);
    this.points.push({ x: pos.x, y: pos.y, speed });
    if (this.points.length > TRAIL_MAX_POINTS) this.points.shift();
  }

  draw() {
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const t = i / this.points.length;
      const alpha = t * map(p.speed, 0, this.car.spec.maxForwardSpeed, 15, 110, true);
      const r = map(t, 0, 1, 2, this.car.width * 0.3);
      fill(255, alpha);
      circle(p.x, p.y, r);
    }
  }
}
