const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const context: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
const levelInput: HTMLInputElement = <HTMLInputElement>document.getElementById('level');

const canvasSize: number = 800;
let points: Array<Point> = [];
let level: number = 6;
let getSubdivisionSize = () => canvasSize / (2 ** level);
let count = 0;
let draw = true;

interface Point {
    x: number,
    y: number
}

function clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d')) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.stroke();
}

function drawGrid() {
    for (let i = 1; i < 2 ** level; i++) {
        drawLine(context, 0, getSubdivisionSize() * i, canvasSize, getSubdivisionSize() * i, '#282828');
        drawLine(context, getSubdivisionSize() * i, 0, getSubdivisionSize() * i, canvasSize, '#282828');
    }
}

function perc2color(percentage: number, maxHue: number = 240, minHue: number = 0) {
    const hue = percentage * (maxHue - minHue) + minHue;
    return `hsl(${hue}, 100%, 70%)`;
}

async function lineOrPattern(context: CanvasRenderingContext2D, ox: number, oy: number, step: number = 1, pattern: string) {
    if (step === level) {
        points.push({ x: ox, y: oy });
    } else {
        generatePattern(context, ox, oy, step + 1, pattern);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generatePattern(context: CanvasRenderingContext2D, ox: number, oy: number, step: number = 1, pattern: string = 'a') {
    if (step > level) return;
    const div = canvasSize / (2 ** step);
    const halfDiv = div / 2;
    switch (pattern) {
        case 'a':
            lineOrPattern(context, ox - halfDiv, oy + halfDiv, step, 'd');
            lineOrPattern(context, ox - halfDiv, oy - halfDiv, step, 'a');
            lineOrPattern(context, ox + halfDiv, oy - halfDiv, step, 'a');
            lineOrPattern(context, ox + halfDiv, oy + halfDiv, step, 'b');
            break;
        case 'b':
            lineOrPattern(context, ox + halfDiv, oy - halfDiv, step, 'c');
            lineOrPattern(context, ox - halfDiv, oy - halfDiv, step, 'b');
            lineOrPattern(context, ox - halfDiv, oy + halfDiv, step, 'b');
            lineOrPattern(context, ox + halfDiv, oy + halfDiv, step, 'a');
            break;
        case 'c':
            lineOrPattern(context, ox + halfDiv, oy - halfDiv, step, 'b');
            lineOrPattern(context, ox + halfDiv, oy + halfDiv, step, 'c');
            lineOrPattern(context, ox - halfDiv, oy + halfDiv, step, 'c');
            lineOrPattern(context, ox - halfDiv, oy - halfDiv, step, 'd');
            break;
        case 'd':
            lineOrPattern(context, ox - halfDiv, oy + halfDiv, step, 'a');
            lineOrPattern(context, ox + halfDiv, oy + halfDiv, step, 'd');
            lineOrPattern(context, ox + halfDiv, oy - halfDiv, step, 'd');
            lineOrPattern(context, ox - halfDiv, oy - halfDiv, step, 'c');
            break;
    }
}

async function drawPattern() {
    context.beginPath()
    for (let i = 0; i < points.length - 1 && draw; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        context.strokeStyle = perc2color(i / points.length);
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
        await sleep(1);
    }
}

levelInput.addEventListener('input', async () => {
    level = +levelInput.value;
    console.log(level, getSubdivisionSize());
    draw = false;
    clearCanvas(canvas, context);
    await sleep(10);
    draw = true;
    points = [];
    generatePattern(context, canvasSize / 2, canvasSize / 2);
    drawGrid();
    drawPattern();
});

context.translate(0.5, 0.5);
generatePattern(context, canvasSize / 2, canvasSize / 2);
drawGrid();
drawPattern();
