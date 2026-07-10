// Base car: owns the matter.js Body plus its Motion (physics), Knockback
// (post-collision response), Controller (decides intent) and MotionTrail.
// Controller is injected, not constructed here, so Car never depends on
// KeyManager directly (PlayerController/StraightLineController/
// SineWaveController are interchangeable behind the same getIntent() shape).
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
    if (this.controller.reverseHeading) {
      this.controller.reverseHeading();
    }
  }

  onCarHit(other, normal) {
    const axial = isAxialHit(this.body.angle, normal);
    this.knockback.trigger(this.body, normal, axial, () => {
      if (this.controller.randomTurn) {
        this.controller.randomTurn();
      }
    });
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
