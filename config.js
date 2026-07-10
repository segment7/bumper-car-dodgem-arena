const ARENA_W = 1400;
const ARENA_H = 700;
const BARRIER_THICKNESS = 20;

var carNumbers = 4;

const START_ZONE = {
  x: BARRIER_THICKNESS+2,
  y: BARRIER_THICKNESS,
  w: 180,
  h: ARENA_H - BARRIER_THICKNESS * 2
};

const STANDARD_SPEC = {
  mass: 1,
  friction: 0.3,
  frictionAir: 0.05,
  restitution: 0.4,
  throttleForce: 0.003,
  maxForwardSpeed: 4,
  maxReverseSpeed: 3.5,
  turnRate: 0.077
};

const SLOW_SPEC = {
  mass: 4,
  friction: 0.3,
  frictionAir: 0.05,
  restitution: 0.2,
  throttleForce: 0.0025,
  maxForwardSpeed: 3,
  maxReverseSpeed: 2.5,
  turnRate: 0.077
};

const BARRIER_RESTITUTION = 0.8;
const BARRIER_FRICTION = 0.7;
const BARRIER_COLOR = 50;

// Sprite art faces down; rotate so angle 0 (local +x) is the car's front.
const SPRITE_ANGLE_OFFSET = -Math.PI / 2;

const KNOCKBACK_PAUSE_MS = 350;

const TRAIL_MAX_POINTS = 18;
const IMPACT_FLASH_LIFESPAN_MS = 350;
const BARRIER_PULSE_LIFESPAN_MS = 300;
const BARRIER_PULSE_MAX_RADIUS = 25;

const HEARING_RADIUS = 500;
const OPPONENT_ENGINE_FREQ = 200;
const ENGINE_FREQ_NEAR_MULT = 2.5;

const MODE = {
  1: { spawn: 'parked', motion: 'static' },
  2: { spawn: 'random', motion: 'straight' },
  3: { spawn: 'random', motion: 'sine' }
};
