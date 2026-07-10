// Mode 2: holds a constant heading/speed (kinematically driven each frame),
// only overridden while the car's Knockback is active.
class StraightLineController {
  constructor(headingAngle, speed) {
    this.headingAngle = headingAngle;
    this.speed = speed;
  }

  getIntent(car) {
    Matter.Body.setAngle(car.body, this.headingAngle);
    Matter.Body.setVelocity(car.body, {
      x: Math.cos(this.headingAngle) * this.speed,
      y: Math.sin(this.headingAngle) * this.speed
    });
    return { throttle: 0, steer: 0 };
  }

  reverseHeading() {
    this.headingAngle += PI;
  }

  randomTurn() {
    this.headingAngle += (Math.random() < 0.5 ? 1 : -1) * HALF_PI;
  }
}
