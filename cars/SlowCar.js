class SlowCar extends Car {
  constructor(x, y, angle, controller, isPlayer = false) {
    const sprite = isPlayer ? sprites.player : sprites.slow;
    super(x, y, angle, SLOW_SPEC, sprite, controller, isPlayer);
  }
}
