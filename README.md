<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Neon Scientific Calculator</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

    body {
        font-family: 'Orbitron', sans-serif;
        background: radial-gradient(circle at top, #0b0c1a, #000);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
    }

    .calculator {
        background: linear-gradient(145deg, #1f1f1f, #111);
        padding: 25px;
        border-radius: 20px;
        width: 340px;
        border: 3px solid #00ffe0;
        box-shadow: 0 0 50px #00ffe0, 0 0 100px #00ffe0 inset;
        animation: glow 2s infinite alternate;
    }

    @keyframes glow {
        0% { box-shadow: 0 0 50px #00ffe0, 0 0 100px #00ffe0 inset; }
        50% { box-shadow: 0 0 70px #00fff0, 0 0 120px #00fff0 inset; }
        100% { box-shadow: 0 0 50px #00ffe0, 0 0 100px #00ffe0 inset; }
    }

    .display {
        background: #222;
        color: #00ffe0;
        font-size: 26px;
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 15px;
        text-align: right;
        border: 2px solid #00ffe0;
        box-shadow: 0 0 20px #00ffe0 inset, 0 0 40px #00ffe0;
    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
    }

    button {
        padding: 15px;
        font-size: 18px;
        border: 2px solid #00ffe0;
        border-radius: 12px;
        cursor: pointer;
        background: #00ffe0;
        color: #000;
        box-shadow: 0 0 15px #00ffe0, 0 0 30px #00ffe0 inset;
        transition: 0.3s;
    }

    button:hover {
        background: #ff5d7a;
        color: #fff;
        box-shadow: 0 0 30px #ff5d7a, 0 0 60px #ff5d7a inset;
    }

    .wide { grid-column: span 2; }

    @media(max-width: 380px){
        .calculator { width: 95%; }
        button { font-size: 16px; padding: 12px; }
        .display { font-size: 20px; padding: 10px; }
    }
</style>
</head>
<body>

<div class="calculator">
    <div id="display" class="display">0</div>
    <div class="buttons">
        <!-- Row 1 -->
        <button onclick="clearDisplay()">C</button>
        <button onclick="deleteChar()">⌫</button>
        <button onclick="appendOperator('%')">%</button>
        <button onclick="appendOperator('/')">/</button>
        <button onclick="appendOperator('*')">*</button>

        <!-- Row 2 -->
        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button onclick="appendOperator('-')">-</button>
        <button onclick="scientificOp('sqrt')">√</button>

        <!-- Row 3 -->
        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button onclick="appendOperator('+')">+</button>
        <button onclick="scientificOp('square')">x²</button>

        <!-- Row 4 -->
        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button onclick="calculate()" class="wide">=</button>
        <button onclick="scientificOp('cube')">x³</button>

        <!-- Row 5 -->
        <button onclick="appendNumber('0')" class="wide">0</button>
        <button onclick="appendOperator('.')">.</button>
        <button onclick="scientificOp('sin')">sin</button>
        <button onclick="scientificOp('cos')">cos</button>
        <button onclick="scientificOp('tan')">tan</button>

        <!-- Row 6 -->
        <button onclick="scientificOp('log')">log</button>
        <button onclick="scientificOp('ln')">ln</button>

        <!-- Row 7: Parentheses -->
        <button onclick="appendOperator('(')">(</button>
        <button onclick="appendOperator(')')">)</button>
        <!-- Memory buttons -->
        <button onclick="memoryPlus()">M+</button>
        <button onclick="memoryMinus()">M-</button>
        <button onclick="memoryRecall()">MR</button>
    </div>
</div>

<script>
    let display = document.getElementById('display');
    let memory = 0;

    function appendNumber(num) {
        if(display.innerText === "0") display.innerText = num;
        else display.innerText += num;
    }

    function appendOperator(op) {
        display.innerText += op;
    }

    function clearDisplay() {
        display.innerText = "0";
    }

    function deleteChar() {
        display.innerText = display.innerText.slice(0,-1);
        if(display.innerText === "") display.innerText = "0";
    }

    function calculate() {
        try {
            display.innerText = eval(display.innerText);
        } catch {
            display.innerText = "Error";
        }
    }

    function scientificOp(op) {
        let val = parseFloat(display.innerText);
        let result;
        switch(op) {
            case 'sqrt': result = Math.sqrt(val); break;
            case 'square': result = Math.pow(val,2); break;
            case 'cube': result = Math.pow(val,3); break;
            case 'sin': result = Math.sin(val); break;
            case 'cos': result = Math.cos(val); break;
            case 'tan': result = Math.tan(val); break;
            case 'log': result = Math.log10(val); break;
            case 'ln': result = Math.log(val); break;
        }
        display.innerText = result;
    }

    // Memory functions
    function memoryPlus() {
        memory += parseFloat(display.innerText);
    }

    function memoryMinus() {
        memory -= parseFloat(display.innerText);
    }

    function memoryRecall() {
        display.innerText = memory;
    }
</script>

</body>
</html>






























