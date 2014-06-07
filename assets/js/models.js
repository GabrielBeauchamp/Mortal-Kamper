function Character(name) {
    this.health = 100;
    this.speed = 0.5; // pixels/s
    this.position = {x: 0, y: 0};
    this.attack = 8;
    this.state = this.states.attacking;
    this.name = name;

    this.states = {
        waiting: 0,
        attacking: 1,
    }
}
