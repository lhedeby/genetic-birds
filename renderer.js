class Renderer {
    constructor() {
        let canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        console.log("renderer callewd");
    }

    renderBG() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, 500, 500);
    }

    renderBirds(birds) {
        for (let b of birds) {
            if (b.alive) {
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(b.x, b.y, b.width, b.height);
                this.ctx.fillStyle = b.color;
                this.ctx.fillRect(b.x + 1, b.y + 1, b.width - 2, b.height - 2);
            }

        }
    }

    renderPipes(pipes) {
        for (let p of pipes) {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(p.x, p.y, p.width, p.height);
        }
    }
    render(birds, pipes) {
        this.renderBG();
        this.renderBirds(birds);
        this.renderPipes(pipes);
    }
}