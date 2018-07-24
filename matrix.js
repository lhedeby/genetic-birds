class Matrix {
    constructor(rows, cols) {
        this.matrix = [];
        this.rows = rows;
        this.cols = cols;
        for(let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.random() - 0.5;
            }
        }

    }

    times(vector, bias) {
        let ans = [];
        for(let i = 0; i < this.rows; i++) {
            ans[i] = bias[i];
            for(let j = 0; j < this.cols; j++) {
                ans[i] += vector[j] * this.matrix[i][j];
            }
        }

        
        //activation; sigmoid;
        ans = ans.map(x => 1 / (1 + Math.exp(-x)));
        //tanh
        //ans = ans.map(x => Math.tanh(x));
        
        return ans;
    }

    mutate(freq, rate) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(Math.random() < freq) {
                    //console.log((Math.random() * 2 - 1) * rate);
                    //console.log(rate);
                    this.matrix[i][j] += (Math.random() * 2 - 1) * rate;
                }
            }
        }
    }

    copy() {
        let newMatrix = new Matrix(this.rows, this.cols);
 
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                newMatrix.matrix[i][j] = this.matrix[i][j];
            }
        }
        return newMatrix;
    }



}