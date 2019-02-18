{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.keys = [
                ['Clear', '÷'],
                ['7', '8', '9', '×'],
                ['4', '5', '6', '+'],
                ['1', '2', '3', '-'],
                ['0', '.', '=']
            ];
            this.operator = null;
            this.firstNum = null;
            this.lastNum = null;
            this.result = null;
            this.resultBackups = null;
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
            this.authorDeclare();
        }
        Calculator.prototype.createOutput = function () {
            var output = document.createElement('div');
            output.classList.add('output');
            var span = document.createElement('span');
            output.appendChild(span);
            span.textContent = '0';
            this.span = span;
            this.container.appendChild(output);
        };
        Calculator.prototype.createContainer = function () {
            var container = document.createElement('div');
            container.classList.add('container');
            document.body.appendChild(container);
            this.container = container;
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (keyList) {
                var div = document.createElement('div');
                div.classList.add('row');
                _this.container.appendChild(div);
                keyList.forEach(function (key) {
                    var button = document.createElement('button');
                    button.textContent = key;
                    button.className = "button text-" + key;
                    div.appendChild(button);
                });
            });
        };
        Calculator.prototype.clearCalculator = function (holdFirstNum) {
            if (holdFirstNum === void 0) { holdFirstNum = true; }
            this.operator = null;
            this.lastNum = null;
            this.resultBackups = this.result;
            this.result = null;
            if (holdFirstNum) {
                this.firstNum = null;
            }
            else {
                this.firstNum = this.resultBackups;
            }
        };
        Calculator.prototype.checkPoint = function (name, text) {
            if (!this[name])
                return;
            if (this[name].indexOf('.') >= 0 && text === '.') {
                return true;
            }
            else {
                return false;
            }
        };
        Calculator.prototype.inputNumber = function (name, text) {
            var result = this.checkPoint(name, text);
            if (result) {
                alert('请勿重复输入小数点');
                return;
            }
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = text;
            }
            this.span.textContent = this[name];
        };
        Calculator.prototype.updateNumber = function (text) {
            if (this.operator) {
                this.inputNumber('lastNum', text);
            }
            else {
                this.inputNumber('firstNum', text);
                this.resultBackups = null;
            }
            // console.log(this.firstNum, this.operator, this.lastNum)
        };
        Calculator.prototype.updateClear = function () {
            this.clearCalculator();
            this.span.textContent = '0';
        };
        Calculator.prototype.updateResult = function (holdFirstNum) {
            if (holdFirstNum === void 0) { holdFirstNum = true; }
            var result;
            if (this.operator && this.firstNum && this.lastNum) {
                // console.log(this.firstNum, this.operator, this.lastNum)
                result = this.getResult();
                this.result = result.toPrecision(12).replace(/(0+$)|(\.0+$)/g, '').replace(/([^0]0+e)|(\.0+e)/g, 'e');
                this.span.textContent = this.result;
                this.clearCalculator(holdFirstNum);
            }
            else {
                alert('请正确操作计算器');
            }
        };
        Calculator.prototype.updateOperator = function (text) {
            if (this.result) {
                this.firstNum = this.result;
            }
            if (this.resultBackups) {
                this.firstNum = this.resultBackups;
            }
            if (this.operator && this.firstNum && this.lastNum) {
                this.updateResult(false);
            }
            this.operator = text;
            // console.log(this.firstNum, this.operator, this.lastNum)
        };
        Calculator.prototype.getResult = function () {
            if (this.operator === '+') {
                return parseFloat(this.firstNum) + parseFloat(this.lastNum);
            }
            else if (this.operator === '-') {
                return parseFloat(this.firstNum) - parseFloat(this.lastNum);
            }
            else if (this.operator === '×') {
                return parseFloat(this.firstNum) * parseFloat(this.lastNum);
            }
            else if (this.operator === '÷') {
                return parseFloat(this.firstNum) / parseFloat(this.lastNum);
            }
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener('click', function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var text = event.target.textContent;
                    if ('1234567890.'.indexOf(text) >= 0) {
                        _this.updateNumber(text);
                    }
                    else if ('÷×+-'.indexOf(text) >= 0) {
                        _this.updateOperator(text);
                    }
                    else if (text === 'Clear') {
                        _this.updateClear();
                    }
                    else if (text === '=') {
                        _this.updateResult();
                    }
                }
            });
        };
        Calculator.prototype.authorDeclare = function () {
            var div = document.createElement('div');
            var span = document.createElement('span');
            div.className = 'author';
            span.textContent = '---create by xuanzebin---';
            div.appendChild(span);
            document.body.appendChild(div);
        };
        return Calculator;
    }());
    new Calculator();
}
