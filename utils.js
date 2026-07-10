function isPointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.w &&
         py >= rect.y && py <= rect.y + rect.h;
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}
