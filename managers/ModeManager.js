// Spawns and clears opponent cars according to the current mode's config.
class ModeManager {
  constructor(world) {
    this.world = world;
    this.cars = [];
  }

  setupMode(config) {
    this.clearCars();
    this.spawnOpponents(config);
  }

  clearCars() {
    this.cars.forEach(car => {
      Matter.World.remove(this.world, car.body);
      if (car.sound) car.sound.stop();
    });
    this.cars = [];
  }

  spawnOpponents(config) {
    const half = Math.floor(carNumbers / 2);

    for (let i = 0; i < carNumbers; i++) {
      const CarType = i < half ? StandardCar : SlowCar;
      let x, y, angle;

      if (config.spawn === 'parked') {
        x = START_ZONE.x + START_ZONE.w / 2;
        y = START_ZONE.y + (i + 1) * (START_ZONE.h / (carNumbers + 1));
        angle = 0;
      } else {
        const spot = this.findFreeRandomSpot();
        x = spot.x;
        y = spot.y;
        angle = Math.random() * TWO_PI;
      }

      const controller = this.makeController(config.motion, angle);
      const car = new CarType(x, y, angle, controller, false);
      car.sound = new SpatialSound(OPPONENT_ENGINE_FREQ);
      this.cars.push(car);
      Matter.World.add(this.world, car.body);
    }
  }

  findFreeRandomSpot() {
    const margin = BARRIER_THICKNESS + 40;
    for (let attempts = 0; attempts < 60; attempts++) {
      const x = randomRange(margin + START_ZONE.w, ARENA_W - margin);
      const y = randomRange(margin, ARENA_H - margin);
      const clear = this.cars.every(c => dist(x, y, c.body.position.x, c.body.position.y) > 90);
      if (clear) return { x, y };
    }
    return { x: ARENA_W / 2, y: ARENA_H / 2 };
  }

  makeController(motionType, angle) {
    if (motionType === 'straight') return new StraightLineController(angle);
    if (motionType === 'sine') return new SineWaveController(angle);
    return { getIntent: () => ({ throttle: 0, steer: 0 }) };
  }
}
