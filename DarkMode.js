// Dark Mode extension: while active only the player is drawn, and each
// opponent is located by its spatial engine hum instead.
class DarkMode {
  constructor() {
    this.active = false;
  }

  toggle() {
    this.active = !this.active;
  }

  update(player, opponents) {
    const shouldPlay = this.active && !!player;
    opponents.forEach(car => {
      if (!car.sound) return;
      if (shouldPlay) {
        car.sound.start();
        car.sound.updateRelativeTo(player.body.position, car.body.position);
      } else {
        car.sound.stop();
      }
    });
  }
}
