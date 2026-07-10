function isPointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.w &&
         py >= rect.y && py <= rect.y + rect.h;
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

// Smallest angle (radians, always >= 0) between two directions.
function angleDiff(a, b) {
  let d = (a - b) % TWO_PI;
  if (d > PI) d -= TWO_PI;
  if (d < -PI) d += TWO_PI;
  return Math.abs(d);
}

// True if the collision normal lands within AXIAL_ANGLE_THRESHOLD degrees
// of the car's front or rear axis (i.e. a near head-on / rear-on hit).
function isAxialHit(carAngle, normal) {
  const normalAngle = Math.atan2(normal.y, normal.x);
  const diffFront = angleDiff(normalAngle, carAngle);
  const diffRear = angleDiff(normalAngle, carAngle + PI);
  const minDiff = Math.min(diffFront, diffRear);
  return degrees(minDiff) <= AXIAL_ANGLE_THRESHOLD;
}
