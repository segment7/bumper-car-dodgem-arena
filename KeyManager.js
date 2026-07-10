class KeyManager {
  constructor() {
    this.keys = {};
    this.spawnArmed = false;
    this.pendingModeRequest = null;
  }

  handleKeyPressed(keyChar, code) {
    this.keys[code] = true;
    if (keyChar === 'i' || keyChar === 'I') this.spawnArmed = true;
    if (keyChar === '1' || keyChar === '2' || keyChar === '3') {
      this.pendingModeRequest = Number(keyChar);
    }
  }

  handleKeyReleased(code) {
    this.keys[code] = false;
  }

  isThrottleForward() { return this.keys[UP_ARROW] === true; }
  isThrottleReverse() { return this.keys[DOWN_ARROW] === true; }
  isSteerLeft() { return this.keys[LEFT_ARROW] === true; }
  isSteerRight() { return this.keys[RIGHT_ARROW] === true; }

  consumeSpawnArm() {
    return this.spawnArmed;
  }

  clearSpawnArm() {
    this.spawnArmed = false;
  }

  consumeModeRequest() {
    const mode = this.pendingModeRequest;
    this.pendingModeRequest = null;
    return mode;
  }
}
