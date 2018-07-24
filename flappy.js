class Game {
    constructor(size) {
        this.size = size;
        this.flock = new Flock(size);
        this.pipes = new Pipes();
        this.renderer = new Renderer();
        
        
    }

    init() {
        setInterval(() => {
            this.loop()}, 10);
    }

    loop() {
        this.flock.update(this.pipes);
        
        this.pipes.update();
        this.flock.collision(this.pipes.pipes);
        this.renderer.render(this.flock.birds, this.pipes.pipes);
    }
}