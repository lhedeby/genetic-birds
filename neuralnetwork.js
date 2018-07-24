class Layer {
    constructor(inputs, outputs, prevLayer) {
        this.matrix = new Matrix(outputs, inputs);
        this.inputs = inputs;
        this.outputs = outputs;

        //init bias
        this.bias = [];
        for(let i = 0; i < outputs; i++) {
            this.bias.push(Math.random()); 
        }
        this.prevLayer = prevLayer;
    }

    recursiveFeed(input) {
        if(this.prevLayer === undefined) {
            return this.matrix.times(input, this.bias);
        }
        else {
            return this.matrix.times(this.prevLayer.recursiveFeed(input), this.bias);
        }  
    }
    copyBias() {
        let newBias = [];
        for(let i = 0; i < this.bias.length; i++) {
            newBias[i] = (this.bias[i]);
        }
        return newBias;
    }
    mutateBias(freq, rate) {
        for(let b of this.bias) {
            if(Math.random() < freq) {
                b += (Math.random() * 2 - 1) * rate;
            }
        }
    }

}

class NeuralNetwork {

    constructor(layers) {
        this.layersArray = layers;
        this.inputs = layers[0];
        this.layers = [];
        this.mutationRate = 0.4;
        this.mutationFreq = 0.4;
        for(let i = 1; i < layers.length; i++) {
            this.layers.push(new Layer(layers[i-1], layers[i], this.layers[i-2]));
        }
    }

    feedForward(input) {
        
        return (this.layers[this.layers.length-1].recursiveFeed(input));
    }

    error(input, ans) {
        let output = this.feedForward(input);
        
        let error = [];
        for(let i = 0; i < output.length; i++) {
            error.push(Math.abs(output[i] - ans[i]));
        }
        console.log(error);
        return error;
    }
    
    copy() {
        let newNN = new NeuralNetwork(this.layersArray);
        for(let i = 0; i < newNN.layers.length; i++) {
            newNN.layers[i].matrix = this.layers[i].matrix.copy();
            newNN.layers[i].bias = this.layers[i].copyBias();
        }
        return newNN;
    }

    mutate() {
        for(let l of this.layers) {
            l.mutateBias(this.mutationFreq, this.mutationRate);
            l.matrix.mutate(this.mutationFreq, this.mutationRate);
        }
    }
}