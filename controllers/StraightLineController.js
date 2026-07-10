// Mode 2: steers toward a constant heading while throttling forward.
class StraightLineController {
  constructor(headingAngle) {
    this.headingAngle = headingAngle;
  }

  getIntent(car) {
    const diff = Math.atan2(
      Math.sin(this.headingAngle - car.body.angle),
      Math.cos(this.headingAngle - car.body.angle)
    );
    const steer = Math.abs(diff) < 0.05 ? 0 : (diff > 0 ? 1 : -1);
    return { throttle: 1, steer };
  }

  reverseHeading() {
    this.headingAngle += Math.PI;
  }

  randomTurn() {
    const delta = (Math.random() < 0.5 ? 1 : -1) * HALF_PI;
    this.headingAngle += delta;
    return delta;
  }
}
