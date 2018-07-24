class Bird {
    constructor() {
        this.x = 50;
        this.y = 100;
        this.width = 20;
        this.height = 20;
        this.yVel = 0;
        this.yAcc = 0.5;
        this.alive = true;
        this.brain = new NeuralNetwork([5,5,1]);
        this.fitness = 1;
    }

    copy() {
        let newBird = new Bird();
        newBird.brain = this.brain.copy();
        return newBird;
    }

    update(pipeX, pipeY1, pipeY2) {
        this.fitness++;
        this.yVel += this.yAcc;
        this.y += this.yVel;
        if(this.y > 480) {
            this.y = 480;
            this.yVel = 0;
            this.alive = false;
        } else if (this.y < 0){
            this.y = 0;
            this.yVel = 0;
            this.alive = false;
        }
        this.think(pipeX, pipeY1, pipeY2);
    }

    think(pipeX, pipeY1, pipeY2) {

        let thought = this.brain.feedForward([this.yVel, this.y, pipeX, pipeY1, pipeY2]);
        
        if(thought > 0.8) {
            this.jump();
        }
    }

    jump() {
        this.yVel = -10;
    }
}