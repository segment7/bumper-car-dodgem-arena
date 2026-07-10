// The single global-hook class: owns the matter.js world, the barrier, the
// Start Zone, all cars, animations, input, and mode/dark-mode state.
class Arena {
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 0;

    this.keyManager = new KeyManager();
    this.animations = new AnimationManager();

    this.cars = [];
    this.player = null;
    this.mode = 1;
    this.darkMode = false;

    this.buildBarrier();
    this.registerCollisions();
    this.setupMode(1);
  }

  buildBarrier() {
    const t = BARRIER_THICKNESS;
    const opts = { isStatic: true, restitution: BARRIER_RESTITUTION, friction: BARRIER_FRICTION };

    this.barriers = [
      Matter.Bodies.rectangle(ARENA_W / 2, t / 2, ARENA_W, t, opts),
      Matter.Bodies.rectangle(ARENA_W / 2, ARENA_H - t / 2, ARENA_W, t, opts),
      Matter.Bodies.rectangle(t / 2, ARENA_H / 2, t, ARENA_H, opts),
      Matter.Bodies.rectangle(ARENA_W - t / 2, ARENA_H / 2, t, ARENA_H, opts)
    ];
    this.barriers.forEach(b => { b.isBarrier = true; });
    Matter.World.add(this.world, this.barriers);
  }

  registerCollisions() {
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const a = pair.bodyA;
        const b = pair.bodyB;
        const carA = a.owner;
        const carB = b.owner;
        const contact = (pair.collision.supports && pair.collision.supports[0]) || a.position;

        if (carA && carB) {
          const normal = pair.collision.normal;
          carA.onCarHit(carB, { x: -normal.x, y: -normal.y });
          carB.onCarHit(carA, normal);
          this.animations.add(new ImpactFlash(contact));
        } else if (carA && b.isBarrier) {
          carA.onBarrierHit();
          this.animations.add(new BarrierPulse(contact));
        } else if (carB && a.isBarrier) {
          carB.onBarrierHit();
          this.animations.add(new BarrierPulse(contact));
        }
      });
    });
  }

  setupMode(modeNumber) {
    this.mode = modeNumber;
    this.clearCars();
    this.spawnOpponents(MODE_CONFIGS[modeNumber]);
    this.player = null;
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
      car.sound = new SpatialSound(80 + i * 15);
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
    if (motionType === 'straight') return new StraightLineController(angle, 3.5);
    if (motionType === 'sine') return new SineWaveController(angle, 3);
    return { getIntent: () => ({ throttle: 0, steer: 0 }) };
  }

  handleKeyPressed(keyChar) {
    userStartAudio();
    this.keyManager.handleKeyPressed(keyChar, keyCode);

    if (keyChar === 'v' || keyChar === 'V') this.darkMode = !this.darkMode;

    const requestedMode = this.keyManager.consumeModeRequest();
    if (requestedMode) this.setupMode(requestedMode);
  }

  handleKeyReleased() {
    this.keyManager.handleKeyReleased(keyCode);
  }

  handleMousePressed(mx, my) {
    if (this.player) return;
    if (!this.keyManager.consumeSpawnArm()) return;

    const arenaInterior = {
      x: BARRIER_THICKNESS, y: BARRIER_THICKNESS,
      w: ARENA_W - BARRIER_THICKNESS * 2, h: ARENA_H - BARRIER_THICKNESS * 2
    };
    if (!isPointInRect(mx, my, arenaInterior) || !isPointInRect(mx, my, START_ZONE)) return;

    const overlaps = this.cars.some(c => dist(mx, my, c.body.position.x, c.body.position.y) < 50);
    if (overlaps) return;

    const controller = new PlayerController(this.keyManager);
    this.player = new StandardCar(mx, my, 0, controller, true);
    this.cars.push(this.player);
    Matter.World.add(this.world, this.player.body);
    this.keyManager.clearSpawnArm();
  }

  update() {
    const dt = deltaTime;
    Matter.Engine.update(this.engine, dt);

    this.cars.forEach(car => car.update(dt));
    this.animations.update(dt);

    if (this.player) {
      this.cars.forEach(car => {
        if (car !== this.player && car.sound) {
          car.sound.start();
          car.sound.updateRelativeTo(this.player.body.position, car.body.position);
        }
      });
    }
  }

  draw() {
    if (this.darkMode) this.drawDark();
    else this.drawNormal();
  }

  drawNormal() {
    background(60, 130, 60);
    this.drawStartZone();
    this.drawBarrier();
    this.cars.forEach(car => car.draw());
    this.animations.draw();
    this.drawHud();
  }

  drawDark() {
    background(0);
    if (this.player) this.player.draw();
    this.animations.draw();
    this.drawHud();
  }

  drawBarrier() {
    fill(80);
    noStroke();
    this.barriers.forEach(b => {
      beginShape();
      b.vertices.forEach(v => vertex(v.x, v.y));
      endShape(CLOSE);
    });
  }

  drawStartZone() {
    noFill();
    stroke(255, 200, 0);
    strokeWeight(2);
    rect(START_ZONE.x, START_ZONE.y, START_ZONE.w, START_ZONE.h);
  }

  drawHud() {
    fill(255);
    noStroke();
    textSize(14);
    text(
      `Mode ${this.mode}  |  Dark Mode [v]: ${this.darkMode ? 'ON' : 'OFF'}  |  ${this.player ? '' : 'Press i, then click the Start Zone to spawn'}`,
      10, ARENA_H - 10
    );
  }
}
