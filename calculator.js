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
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
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
        Calculator.prototype.clearCalculator = function () {
            this.operator = null;
            this.firstNum = null;
            this.lastNum = null;
            this.result = null;
        };
        Calculator.prototype.inputNumber = function (name, text) {
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
            }
        };
        Calculator.prototype.updateClear = function () {
            this.clearCalculator();
            this.span.textContent = '0';
        };
        Calculator.prototype.updateResult = function () {
            var result;
            if (this.operator && this.firstNum && this.lastNum) {
                result = this.getResult();
                this.result = result.toPrecision(12).replace(/(0+$)|(\.0+$)/g, '').replace(/([^0]0+e)|(\.0+e)/g, 'e');
                this.span.textContent = this.result;
                this.clearCalculator();
            }
            else {
                alert('请正确操作计算器');
            }
        };
        Calculator.prototype.updateOperator = function (text) {
            if (this.result) {
                this.firstNum = this.result;
            }
            if (this.operator && this.firstNum && this.lastNum) {
                this.updateResult();
            }
            this.operator = text;
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
        return Calculator;
    }());
    new Calculator();
}
