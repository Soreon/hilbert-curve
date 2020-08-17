"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var levelInput = document.getElementById('level');
var canvasSize = 800;
var points = [];
var level = 6;
var getSubdivisionSize = function () { return canvasSize / (Math.pow(2, level)); };
var count = 0;
var draw = true;
function clearCanvas(canvas, context) {
    if (context === void 0) { context = canvas.getContext('2d'); }
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function drawLine(context, x1, y1, x2, y2, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.stroke();
}
function drawGrid() {
    for (var i = 1; i < Math.pow(2, level); i++) {
        drawLine(context, 0, getSubdivisionSize() * i, canvasSize, getSubdivisionSize() * i, '#282828');
        drawLine(context, getSubdivisionSize() * i, 0, getSubdivisionSize() * i, canvasSize, '#282828');
    }
}
function perc2color(percentage, maxHue, minHue) {
    if (maxHue === void 0) { maxHue = 240; }
    if (minHue === void 0) { minHue = 0; }
    var hue = percentage * (maxHue - minHue) + minHue;
    return "hsl(" + hue + ", 100%, 70%)";
}
function lineOrPattern(context, ox, oy, step, pattern) {
    if (step === void 0) { step = 1; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (step === level) {
                points.push({ x: ox, y: oy });
            }
            else {
                generatePattern(context, ox, oy, step + 1, pattern);
            }
            return [2 /*return*/];
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function generatePattern(context, ox, oy, step, pattern) {
    if (step === void 0) { step = 1; }
    if (pattern === void 0) { pattern = 'a'; }
    if (step > level)
        return;
    var div = canvasSize / (Math.pow(2, step));
    var halfDiv = div / 2;
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
function drawPattern() {
    return __awaiter(this, void 0, void 0, function () {
        var i, p1, p2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.beginPath();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < points.length - 1 && draw)) return [3 /*break*/, 4];
                    p1 = points[i];
                    p2 = points[i + 1];
                    context.strokeStyle = perc2color(i / points.length);
                    context.beginPath();
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                    return [4 /*yield*/, sleep(1)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
levelInput.addEventListener('input', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                level = +levelInput.value;
                console.log(level, getSubdivisionSize());
                draw = false;
                clearCanvas(canvas, context);
                return [4 /*yield*/, sleep(10)];
            case 1:
                _a.sent();
                draw = true;
                points = [];
                generatePattern(context, canvasSize / 2, canvasSize / 2);
                drawGrid();
                drawPattern();
                return [2 /*return*/];
        }
    });
}); });
context.translate(0.5, 0.5);
generatePattern(context, canvasSize / 2, canvasSize / 2);
drawGrid();
drawPattern();
