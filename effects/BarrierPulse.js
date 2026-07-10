// Localised colour-invert ripple at a barrier contact point. Pixel-invert
// technique scoped to a small growing/fading region (not the full canvas)
// so it stays cheap to run every frame during its short lifespan.
class BarrierPulse extends Effect {
  constructor(pos) {
    super(pos, BARRIER_PULSE_LIFESPAN_MS);
  }

  draw() {
    const t = this.progress();
    const r = lerp(4, BARRIER_PULSE_MAX_RADIUS, Math.sin(t * PI));
    const size = Math.round(r * 2);
    if (size <= 0) return;

    const x = Math.round(constrain(this.pos.x - r, 0, width - size));
    const y = Math.round(constrain(this.pos.y - r, 0, height - size));

    let region = get(x, y, size, size);
    region.loadPixels();
    for (let i = 0; i < region.pixels.length; i += 4) {
      region.pixels[i] = 255 - region.pixels[i];
      region.pixels[i + 1] = 255 - region.pixels[i + 1];
      region.pixels[i + 2] = 255 - region.pixels[i + 2];
    }
    region.updatePixels();
    image(region, x, y);
  }
}
