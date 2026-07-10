const ARENA_W = 1400;
const ARENA_H = 700;
const BARRIER_THICKNESS = 40;

var carNumbers = 4;

const START_ZONE = {
  x: BARRIER_THICKNESS,
  y: BARRIER_THICKNESS,
  w: 180,
  h: ARENA_H - BARRIER_THICKNESS * 2
};

const STANDARD_SPEC = {
  mass: 1,
  friction: 0.05,
  frictionAir: 0.03,
  restitution: 0.5,
  throttleForce: 0.012,
  maxForwardSpeed: 9,
  maxReverseSpeed: 4,
  turnRate: 0.045
};

const SLOW_SPEC = {
  mass: 1.8,
  friction: 0.12,
  frictionAir: 0.05,
  restitution: 0.35,
  throttleForce: 0.007,
  maxForwardSpeed: 5,
  maxReverseSpeed: 2.5,
  turnRate: 0.032
};

const BARRIER_RESTITUTION = 0.7;
const BARRIER_FRICTION = 0.1;

// Sprite art draws the car's front facing down; this offset rotates it so
// angle 0 (our "forward" convention, local +x) visually faces forward.
const SPRITE_ANGLE_OFFSET = -Math.PI / 2;

const AXIAL_ANGLE_THRESHOLD = 15;
const AXIAL_BOOST = 4;
const KNOCKBACK_PAUSE_MS = 200;

const TRAIL_MAX_POINTS = 18;
const IMPACT_FLASH_LIFESPAN_MS = 350;
const BARRIER_PULSE_LIFESPAN_MS = 300;
const BARRIER_PULSE_MAX_RADIUS = 45;

const HEARING_RADIUS = 700;

const MODE_CONFIGS = {
  1: { spawn: 'parked', motion: 'static' },
  2: { spawn: 'random', motion: 'straight' },
  3: { spawn: 'random', motion: 'sine' }
};
