class Pipes {



    constructor() {
        this.gap = 150;
        this.pipes = [];
        this.addPipe();
        this.distanceBetweenPipes = 250;
        this.count = 0;
    }

    update() {
        // if(this.pipes.length === 0) {
        //     this.addPipe();
        // }
        if(this.count++ > this.distanceBetweenPipes) {
            this.count = 0;
            this.addPipe();
        }
        for(let p of this.pipes) {
            p.x--;
        }
        if(this.pipes[0].x <= 0) {
            this.pipes.shift(); 
            this.pipes.shift(); 
            //this.addPipe();
        }
        
    }

    reset() {
        this.pipes = [];
        this.count = 0;
        this.addPipe();
    }

    addPipe() {
        console.log("addpipe");
        let rand = Math.random();
        this.pipes.push({x: 500, y: 0, width: 50, height:100 + (rand * 200)});
        this.pipes.push({x: 500, y: 100 + (rand * 200) + this.gap, width: 50, height: 500 - 100 + (rand * 200) + this.gap });
    }
}