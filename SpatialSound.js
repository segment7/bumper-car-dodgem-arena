// Per-opponent engine-hum emitter for the Dark Mode extension: volume falls
// off with distance to the player, pan follows relative left/right position.
class SpatialSound {
  constructor(freq) {
    this.osc = new p5.Oscillator('sine');
    this.osc.freq(freq);
    this.osc.amp(0);
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.osc.start();
      this.started = true;
    }
  }

  updateRelativeTo(listenerPos, sourcePos) {
    const d = dist(listenerPos.x, listenerPos.y, sourcePos.x, sourcePos.y);
    const vol = map(d, 0, HEARING_RADIUS, 0.3, 0, true);
    const pan = constrain(map(sourcePos.x - listenerPos.x, -HEARING_RADIUS, HEARING_RADIUS, -1, 1), -1, 1);
    this.osc.amp(vol, 0.05);
    this.osc.pan(pan);
  }

  stop() {
    if (this.started) {
      this.osc.stop();
      this.started = false;
    }
  }
}
