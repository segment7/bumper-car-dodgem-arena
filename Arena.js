// The single global-hook class: wires the matter.js world, managers and input together, and owns rendering.
class Arena {
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 0;

    this.keyManager = new KeyManager();
    this.animations = new AnimationManager();
    this.modeManager = new ModeManager(this.world);
    this.darkMode = new DarkMode();

    this.player = null;
    this.mode = 1;

    this.buildBarrier();
    this.collisionManager = new CollisionManager(this.engine, this.animations);
    this.setupMode(1);
  }

  get cars() {
    return this.player ? this.modeManager.cars.concat(this.player) : this.modeManager.cars;
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

  setupMode(modeNumber) {
    this.mode = modeNumber;
    this.modeManager.setupMode(MODE[modeNumber]);
    if (this.player) Matter.World.remove(this.world, this.player.body);
    this.player = null;
  }

  handleKeyPressed(keyChar) {
    userStartAudio();
    this.keyManager.handleKeyPressed(keyChar, keyCode);

    if (keyChar === 'v' || keyChar === 'V') this.darkMode.toggle();

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
    Matter.World.add(this.world, this.player.body);
    this.keyManager.clearSpawnArm();
  }

  update() {
    const dt = deltaTime;
    Matter.Engine.update(this.engine, dt);

    this.cars.forEach(car => car.update(dt));
    this.animations.update(dt);
    this.darkMode.update(this.player, this.modeManager.cars);
  }

  draw() {
    if (this.darkMode.active) this.drawDark();
    else this.drawNormal();
  }

  drawNormal() {
    background(60, 130, 60);
    this.drawFloor();
    this.drawStartZone();
    this.drawBarrier();
    this.cars.forEach(car => car.draw());
    this.animations.draw();
    this.drawHud();
  }

  drawFloor() {
    const floorX = START_ZONE.x;
    const tile = sprites.woodTexture;
    for (let y = 0; y < ARENA_H; y += tile.height) {
      for (let x = floorX; x < ARENA_W; x += tile.width) {
        image(tile, x, y);
      }
    }
  }

  drawDark() {
    background(0);
    this.drawBarrier();
    if (this.player) this.player.draw();
    this.animations.draw();
    this.drawDarkHud();
  }

  drawDarkHud() {
    fill(255);
    noStroke();
    textSize(14);
    text('Dark Mode  |  Press v to exit', 6, ARENA_H - 6);
  }

  drawBarrier() {
    fill(BARRIER_COLOR);
    noStroke();
    this.barriers.forEach(b => {
      beginShape();
      b.vertices.forEach(v => vertex(v.x, v.y));
      endShape(CLOSE);
    });
  }

  drawStartZone() {
    noFill();
    stroke(155, 200, 100);
    strokeWeight(2);
    rect(START_ZONE.x, START_ZONE.y, START_ZONE.w, START_ZONE.h);
  }

  drawHud() {
    fill(255);
    noStroke();
    textSize(14);
    text(
      `Mode ${this.mode}  |  Dark Mode [Press v]: ${this.darkMode.active ? 'ON' : 'OFF'}  |  ${this.player ? '' : 'Press i, then click the Start Zone to spawn'}`,
      6, ARENA_H - 6
    );
  }
}
