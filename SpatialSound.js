// Dark Mode engine hum: volume, pan and pitch all track the player's position.
class SpatialSound {
  constructor(freq) {
    this.baseFreq = freq;
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
    const vol = map(d, 0, HEARING_RADIUS, 0.7, 0, true);
    const pan = constrain(map(sourcePos.x - listenerPos.x, -HEARING_RADIUS, HEARING_RADIUS, -1, 1), -1, 1);
    const freq = map(d, 0, HEARING_RADIUS, this.baseFreq * ENGINE_FREQ_NEAR_MULT, this.baseFreq, true);
    this.osc.amp(vol, 0.05);
    this.osc.pan(pan);
    this.osc.freq(freq, 0.05);
  }

  stop() {
    if (this.started) {
      this.osc.stop();
      this.started = false;
    }
  }
}
