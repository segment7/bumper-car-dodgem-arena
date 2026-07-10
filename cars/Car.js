// Base car: owns the matter.js body plus its Motion, Knockback, injected controller and MotionTrail.
class Car {
  constructor(x, y, angle, spec, sprite, controller, isPlayer) {
    this.spec = spec;
    this.sprite = sprite;
    this.controller = controller;
    this.isPlayer = isPlayer;
    this.sound = null;

    const scale = 60 / Math.max(sprite.width, sprite.height);
    this.width = sprite.width * scale;
    this.height = sprite.height * scale;

    this.body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
      angle,
      mass: spec.mass,
      friction: spec.friction,
      frictionAir: spec.frictionAir,
      restitution: spec.restitution
    });
    this.body.owner = this;

    this.motion = new Motion(spec);
    this.knockback = new Knockback();
    this.trail = new MotionTrail(this);
  }

  update(dt) {
    this.knockback.update(dt);

    if (this.knockback.isActive()) {
      this.trail.pause();
    } else {
      const intent = this.controller.getIntent(this);
      this.motion.apply(this.body, intent);
      this.trail.resume();
    }

    this.trail.update(this.body.position, this.body.velocity);
  }

  onBarrierHit() {
    if (this.knockback.isActive()) return;
    if (!this.controller.reverseHeading) return;
    this.knockback.trigger(() => {
      this.controller.reverseHeading();
      this.snapTurn(Math.PI);
    });
  }

  onCarHit() {
    if (this.knockback.isActive()) return;
    this.knockback.trigger(() => {
      if (this.controller.randomTurn) {
        this.snapTurn(this.controller.randomTurn());
      }
    });
  }

  // Rotates the body about its centre.
  snapTurn(delta) {
    Matter.Body.setAngle(this.body, this.body.angle + delta);
    Matter.Body.setAngularVelocity(this.body, 0);
  }

  draw() {
    this.trail.draw();

    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle + SPRITE_ANGLE_OFFSET);
    imageMode(CENTER);
    image(this.sprite, 0, 0, this.width, this.height);
    pop();
  }
}
