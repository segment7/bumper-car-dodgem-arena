let arena;

function preload() {
  loadGameAssets();
}

function setup() {
  createCanvas(ARENA_W, ARENA_H);
  arena = new Arena();
}

function draw() {
  arena.update();
  arena.draw();
}

function keyPressed() {
  arena.handleKeyPressed(key);
}

function keyReleased() {
  arena.handleKeyReleased();
}

function mousePressed() {
  arena.handleMousePressed(mouseX, mouseY);
}

/*
COMMENTARY (draft, ≤500 words — will be refined as remaining features land)

Physics: barriers and cars are matter.js bodies with deliberately different
restitution/friction/mass so collisions look and feel different depending on
what's hit. Standard cars are lighter with more throttle force and a higher
top speed; Slow cars are heavier, weaker-engined, and grippier (more
friction), so the same throttle force produces visibly sluggish acceleration
and they get displaced less in a collision - that displacement difference is
matter.js's own inverse-mass impulse resolution, not a hand-rolled formula.
Throttle is force-based (Motion class applies a force along the body's
heading each frame while held); a max forward/reverse speed is enforced
separately by clamping velocity magnitude after the physics step.

Opponent logic (modes 2/3): each opponent is driven by a small controller
object (StraightLineController / SineWaveController) that kinematically sets
the body's angle/velocity every frame to hold a constant heading (mode 2) or
an oscillating heading at roughly constant speed (mode 3) - this keeps their
paths readable rather than physics-drifting. On collision, a brief
Knockback state takes over: matter.js's own restitution/mass separates the
cars; if the hit lands within 15 degrees of a car's front/rear axis an extra
velocity nudge is added along the collision normal so head-on/rear hits
travel further than glancing ones. During that short window the
controller/trail are suspended so the physics-driven slide is visible; once
it ends, opponents turn 90 degrees in a random direction and resume their
path, while the player is never force-turned and simply regains manual
control.

Animations: MotionTrail is a per-car fading point history scaled by speed,
paused during a knockback so it doesn't smear through the slide. ImpactFlash
draws the spark sprite at the car-car contact point. BarrierPulse reuses a
pixel-invert technique (loadPixels/updatePixels) but scoped to a small
region around the barrier contact point rather than the full canvas, giving
a cheap localised colour-shift ripple.

Extension - Dark Mode: toggled independently of modes 1-3 (key v), it
switches rendering to a black canvas showing only the player's own sprite -
opponents and their trail/pulse are hidden, though an ImpactFlash still
fires on player impact as a fair-play cue. Each opponent carries a
SpatialSound emitter (p5.sound Oscillator) whose volume falls off with
distance to the player and whose stereo pan follows relative left/right
position, so the player has to locate opponents by ear instead of by sight.
This is a genuine perception-based mechanic (real-time spatial audio +
selective rendering), not a scoring bolt-on.
*/
