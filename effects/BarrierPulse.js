// Colour-invert flash at a barrier contact point, masked to the barrier's
// own colour so nearby floor/car pixels are untouched.
class BarrierPulse extends Effect {
  constructor(pos) {
    super(pos, BARRIER_PULSE_LIFESPAN_MS);
  }

  draw() {
    const r = BARRIER_PULSE_MAX_RADIUS;
    const size = Math.round(r * 2);
    const tolerance = 12;

    const x = Math.round(constrain(this.pos.x - r, 0, width - size));
    const y = Math.round(constrain(this.pos.y - r, 0, height - size));

    let region = get(x, y, size, size);
    region.loadPixels();
    for (let i = 0; i < region.pixels.length; i += 4) {
      const isWall = Math.abs(region.pixels[i] - BARRIER_COLOR) < tolerance &&
                      Math.abs(region.pixels[i + 1] - BARRIER_COLOR) < tolerance &&
                      Math.abs(region.pixels[i + 2] - BARRIER_COLOR) < tolerance;
      if (!isWall) continue;
      region.pixels[i] = 255 - region.pixels[i];
      region.pixels[i + 1] = 255 - region.pixels[i + 1];
      region.pixels[i + 2] = 255 - region.pixels[i + 2];
    }
    region.updatePixels();
    image(region, x, y);
  }
}
