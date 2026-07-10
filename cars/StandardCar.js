class StandardCar extends Car {
  constructor(x, y, angle, controller, isPlayer = false) {
    const sprite = isPlayer ? sprites.player : sprites.standard;
    super(x, y, angle, STANDARD_SPEC, sprite, controller, isPlayer);
  }
}
