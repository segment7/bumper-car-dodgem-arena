// Mode 3: oscillates heading around a base angle while holding ~constant
// speed, same override rules as StraightLineController.
class SineWaveController {
  constructor(headingAngle, speed) {
    this.baseAngle = headingAngle;
    this.speed = speed;
    this.t = 0;
  }

  getIntent(car) {
    this.t += deltaTime / 1000;
    const angle = this.baseAngle + Math.sin(this.t * 2) * 0.5;

    Matter.Body.setAngle(car.body, angle);
    Matter.Body.setVelocity(car.body, {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed
    });
    return { throttle: 0, steer: 0 };
  }

  reverseHeading() {
    this.baseAngle += PI;
  }

  randomTurn() {
    this.baseAngle += (Math.random() < 0.5 ? 1 : -1) * HALF_PI;
  }
}
