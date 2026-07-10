// Routes matter.js collision events to the cars involved and spawns the matching visual effect.
class CollisionManager {
  constructor(engine, animations) {
    this.engine = engine;
    this.animations = animations;
    this.register();
  }

  averageSupports(supports) {
    if (!supports || supports.length === 0) return null;
    const sum = supports.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
    return { x: sum.x / supports.length, y: sum.y / supports.length };
  }

  register() {
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => this.handlePair(pair));
    });
  }

  handlePair(pair) {
    const a = pair.bodyA;
    const b = pair.bodyB;
    const carA = a.owner;
    const carB = b.owner;
    const contact = this.averageSupports(pair.collision.supports) || a.position;

    if (carA && carB) {
      carA.onCarHit();
      carB.onCarHit();
      this.animations.add(new ImpactFlash(contact));
    } else if (carA && b.isBarrier) {
      carA.onBarrierHit();
      this.animations.add(new BarrierPulse(contact));
    } else if (carB && a.isBarrier) {
      carB.onBarrierHit();
      this.animations.add(new BarrierPulse(contact));
    }
  }
}
