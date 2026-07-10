// Brief spark ring rendered at a car-car collision contact point.
class ImpactFlash extends Effect {
  constructor(pos) {
    super(pos, IMPACT_FLASH_LIFESPAN_MS);
  }

  draw() {
    const t = this.progress();
    const size = lerp(10, 55, t);
    const alpha = lerp(255, 0, t);

    push();
    imageMode(CENTER);
    tint(255, alpha);
    image(sprites.spark, this.pos.x, this.pos.y, size, size);
    pop();
  }
}
