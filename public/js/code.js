import Canvas from "https://codepen.io/JuanFuentes/pen/xxKrBVg.js";
import Vector from "https://codepen.io/JuanFuentes/pen/395c2c0aa0b7cc6c474be43554c1aa45.js";
Math.TAU = Math.PI * 2;

class Line {
	constructor(args) {
		this.lineWidth = args.radio / 30;
		this.radio = args.radio;
		this.from = args.from;
		this.to = args.from + 0.005; //args.to
	}

	draw(_ctx, _center) {
		_ctx.beginPath();
		_ctx.arc(_center.x, _center.y, this.radio, this.from, this.to, false);
		_ctx.stroke();
	}
}

class Phosphenes extends Canvas {
    constructor(containerId) {
        super(containerId);
        this.totalCircles = 12;
        this.slices = 30;
        this.amount = 1 / this.totalCircles;
        this.pos = new Vector(0, 0);
        this.deface = 2;
        this.setup();
				this.animate();
    }

    resize() {
        this.corner = new Vector(this.canvas.width, this.canvas.height);
        this.center = new Vector(this.corner.x / 2, this.corner.y / 2);
        this.maxRadio = this.center.distTo(this.corner);
    }

    setup() {
        this.resize();
        this.lines = [];
        this.sliceRadio = this.maxRadio / this.totalCircles;
        let _anglePerSlice = Math.TAU / this.slices;
        for (let _angle = _anglePerSlice; _angle < Math.TAU; _angle += _anglePerSlice) {
            let _line = new Line({
                from: _angle,
                to: _angle + _anglePerSlice,
                radio: this.maxRadio
            });
            this.lines.push(_line);
        }
    }
	
		animate() {
			requestAnimationFrame(this.animate.bind(this));
			this.render();
		}

    render() {
				let time = new Date().getTime() * 0.001;
    	  this.deface = Math.sin(time) * 200;
        this.counter = 0;
        this.background("rgba(0,0,0,0.1)");
        this.context.lineWidth = 15;
        this.context.lineCap = "round";
        for (let i = 0; i < this.totalCircles; i++) {
            let _scale = i * this.amount;
            this.context.save();
            this.context.translate(this.center.x, this.center.y);
            this.context.rotate(Math.sin(time / i));
            this.context.scale(_scale, _scale);
            for (let j = 0; j < this.lines.length; j++) {
                this.pos.x = (Math.cos(time + i - j) * this.deface);
                this.pos.y = (Math.cos(time + i - j) * this.deface);
                this.lines[j].draw(this.context, this.pos);
								this.context.strokeStyle = "rgb("+Math.abs((Math.cos(time + i - j) * 255))+","+Math.abs((Math.sin(time + i - j) * 255))+",0)";
								this.context.stroke();
            }
            this.context.restore();
        }
    }
}

let _visual = new Phosphenes("phosphenes");