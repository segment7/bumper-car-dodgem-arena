/*
COMMENTARY (≤500 words)

Physics. All barriers and cars are matter.js bodies. I gave the two car
types different mass, friction and restitution values, so collisions feel
different depending on what is hit. The standard car is light, with a
stronger engine force and a higher top speed. The slow car is heavier and
accelerates slowly, and it is also pushed back less in a crash - this
difference comes from matter.js resolving the impulse by mass, not from my
own formula. Throttle is force-based: while a key is held, the Motion class
applies a force along the car's heading every frame, and a separate clamp
keeps each car under its own top speed. Barriers have high restitution so
they feel like a hard wall rather than a cushion.

Opponents (modes 2 and 3). Each opponent car is driven by a small
controller object. StraightLineController steers toward one fixed heading,
and SineWaveController steers toward a heading that swings over time. Both
hand their intent to the same Motion system the player uses, so an opponent
accelerates and tops out exactly like a player-driven car of the same spec,
instead of moving at an artificial fixed speed. When a collision happens,
matter.js separates the bodies, and a short Knockback state pauses the
controller and trail so the slide stays visible. On a barrier hit the car
turns 180 degrees on the spot and then drives away; on a car-car hit it
turns 90 degrees left or right at random. The player car is never
force-turned - it only bounces.

Animations. MotionTrail is a fading point history behind each car, scaled
by speed and paused during knockback. ImpactFlash draws a spark sprite at
the car-car contact point. BarrierPulse inverts the barrier's own pixels in
a small area around the contact point, masked by colour so floor and car
pixels nearby are not affected. The floor is tiled with a small wood
texture repeated across the arena instead of one stretched image.

Extension - Dark Mode (key v, independent of modes 1-3). The screen turns
black and only the player's sprite is drawn; opponents are hidden, although
an ImpactFlash still fires when the player is hit, as a fair-play cue.
Every opponent carries a SpatialSound emitter. Its volume falls off with
distance to the player, its stereo pan follows the left/right position, and
its pitch rises as the player gets closer, so a higher hum is a clear
warning that a hidden car is near. In this way the player must locate
opponents by ear instead of sight. I chose this perception-based mechanic
(real-time spatial audio plus selective rendering) because it has no timer
or score, so it avoids the easy scoring extension that the brief excludes.
*/
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
