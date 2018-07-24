class Flock {
    constructor(size) {
        this.birds = [];
        this.size = size;
        for(let i = 0; i < this.size; i++) {
            this.birds.push(new Bird());
        }
        this.score = 0;
        this.fitnessSum = 0;
        this.generation = 1;
        this.pgen = document.getElementById("gen");
        this.pscore = document.getElementById("score");
        this.palive = document.getElementById("alive");
        this.phighscore = document.getElementById("best");
        this.highscore = 0;
        this.bestBird;
    }

    update(pipes) {
        if(!this.allDead()) {
            this.score++;
            this.pscore.innerText = `Score: ${this.score}`;
            let aliveCount = 0;
            for(let b of this.birds) {
                if(b.alive) {
                    b.update(pipes.pipes[0].x, pipes.pipes[0].height, pipes.pipes[1].y);
                    aliveCount++;
                } 
            }
            this.palive.innerText = `Alive: ${aliveCount}`;
        } else {

            this.calcFitnessSum();
            this.selectParents();
            let newBirds = [];
            let best = this.selectBest();
            
            
            for(let i = 0; i < this.size; i++) {
                newBirds.push(this.selectParents());
            }
            //newBirds.pop();
            //newBirds.push(new Bird());
            
            pipes.reset();
            this.birds = newBirds;
            this.mutate();
            this.birds.push(best);
            this.birds.push(this.bestBird.copy());
            this.generation++;
            this.score = 0;
            this.pgen.innerText = `Generation: ${this.generation}`;
            
        }
    }



    mutate() {
        for(let b of this.birds) {
            b.brain.mutate();
        }
    }
    selectBest() {
        let max = 0;
        let index = 0;
        for(let i = 0; i < this.size; i++) {
            if(this.birds[i].fitness > max) {
                max = this.birds[i].fitness;
                index = i;
            }
        }
        if(this.birds[index].fitness > this.highscore) {
            this.highscore = this.birds[index].fitness;
            this.phighscore.innerText = `Highscore: ${this.birds[index].fitness}`;
            this.bestBird = this.birds[index].copy();
        }
                return this.birds[index].copy();
    }

    selectParents() {
        let rand = Math.random() * this.fitnessSum;
 
        let runningSum = 0;
        
        for(let b of this.birds) {
            runningSum += b.fitness;
            if(runningSum > rand) {
                
                return b.copy();
            }
        }
        
    }


    calcFitnessSum() {
        this.fitnessSum = 0;
        for(let b of this.birds) {
            this.fitnessSum += b.fitness;
        }
        
    }



    allDead() {
        for(let b of this.birds) {
            if(b.alive) 
                return false;
        }
        
        return true;
    }
    collision(pipes) {
        
        for(let b of this.birds) {
            if(this.collided(b , pipes[0]) || this.collided(b , pipes[1])) {
                b.alive = false;
                
            }
        }
    }

    collided(b, p) {
        
        return !(b.x + b.width < p.x 
                || b.x > p.x + p.width
                || b.y + b.height < p.y
                || b.y > p.y + p.height);
    }
}