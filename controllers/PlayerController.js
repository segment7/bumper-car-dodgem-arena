class PlayerController {
  constructor(keyManager) {
    this.keyManager = keyManager;
  }

  getIntent() {
    let throttle = 0;
    if (this.keyManager.isThrottleForward()) throttle = 1;
    else if (this.keyManager.isThrottleReverse()) throttle = -1;

    let steer = 0;
    if (this.keyManager.isSteerLeft()) steer = -1;
    else if (this.keyManager.isSteerRight()) steer = 1;

    return { throttle, steer };
  }

  // Intentionally no reverseHeading()/randomTurn(): the player is never
  // force-turned by the collision policy, only Car's physical knockback
  // (velocity nudge) applies, then the player keeps manual control.
}
