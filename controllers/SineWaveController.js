// Mode 3: steers toward a heading that oscillates around a base angle.
class SineWaveController {
  constructor(headingAngle) {
    this.baseAngle = headingAngle;
    this.t = 0;
  }

  getIntent(car) {
    this.t += deltaTime / 1000;
    const targetAngle = this.baseAngle + Math.sin(this.t * 2) * 0.5;

    const diff = Math.atan2(
      Math.sin(targetAngle - car.body.angle),
      Math.cos(targetAngle - car.body.angle)
    );
    const steer = Math.abs(diff) < 0.05 ? 0 : (diff > 0 ? 1 : -1);
    return { throttle: 1, steer };
  }

  reverseHeading() {
    this.baseAngle += Math.PI;
  }

  randomTurn() {
    const delta = (Math.random() < 0.5 ? 1 : -1) * HALF_PI;
    this.baseAngle += delta;
    return delta;
  }
}
