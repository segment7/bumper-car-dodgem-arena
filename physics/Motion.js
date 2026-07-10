// Turns a controller's {throttle, steer} intent into matter.js forces, then clamps the car's speed.
class Motion {
  constructor(spec) {
    this.spec = spec;
  }

  apply(body, intent) {
    const { throttle, steer } = intent;

    if (throttle !== 0) {
      const forward = { x: Math.cos(body.angle), y: Math.sin(body.angle) };
      const forceMag = this.spec.throttleForce * throttle;
      Matter.Body.applyForce(body, body.position, {
        x: forward.x * forceMag,
        y: forward.y * forceMag
      });
    }

    Matter.Body.setAngularVelocity(body, steer !== 0 ? steer * this.spec.turnRate : 0);

    this.clampSpeed(body);
  }

  clampSpeed(body) {
    const speed = Matter.Vector.magnitude(body.velocity);
    if (speed === 0) return;

    const forward = { x: Math.cos(body.angle), y: Math.sin(body.angle) };
    const headingSpeed = Matter.Vector.dot(body.velocity, forward);
    const limit = headingSpeed >= 0 ? this.spec.maxForwardSpeed : this.spec.maxReverseSpeed;

    if (speed > limit) {
      const scale = limit / speed;
      Matter.Body.setVelocity(body, {
        x: body.velocity.x * scale,
        y: body.velocity.y * scale
      });
    }
  }
}
