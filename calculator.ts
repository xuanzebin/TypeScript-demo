{
    class Calculator {
        public keys: Array<Array<string>> = [
            ['Clear', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '+'],
            ['1', '2', '3', '-'],
            ['0', '.', '=']
        ]
        public container: HTMLDivElement
        public span: HTMLSpanElement
        public operator: string = null
        public firstNum: string = null
        public lastNum: string = null
        public result: string = null
        public resultBackups: string = null
        constructor() {
            this.createContainer()
            this.createOutput()
            this.createButtons()
            this.bindEvents()
        }
        createOutput(): void {
            let output: HTMLDivElement = document.createElement('div')
            output.classList.add('output')
            let span: HTMLSpanElement = document.createElement('span')
            output.appendChild(span)
            span.textContent = '0'
            this.span = span
            this.container.appendChild(output)
        }
        createContainer(): void {
            let container: HTMLDivElement = document.createElement('div')
            container.classList.add('container')
            document.body.appendChild(container)
            this.container = container
        }
        createButtons(): void {
            this.keys.forEach((keyList: Array<string>) => {
                let div: HTMLDivElement = document.createElement('div')
                div.classList.add('row')
                this.container.appendChild(div)
                keyList.forEach((key: string) => {
                    let button: HTMLButtonElement = document.createElement('button')
                    button.textContent = key
                    button.className = `button text-${key}`
                    div.appendChild(button)
                })
            })
        }
        clearCalculator(holdFirstNum: boolean = true): void {
            this.operator = null
            this.lastNum = null
            this.resultBackups = this.result
            this.result = null
            if (holdFirstNum) {
                this.firstNum = null
            } else {
                this.firstNum = this.resultBackups
            }
        }
        inputNumber(name: string, text: string): void {
            if (this[name]) {
                this[name] += text
            } else {
                this[name] = text
            }
            this.span.textContent = this[name]
        }
        updateNumber(text: string): void {
            if (this.operator) {
                this.inputNumber('lastNum', text)
            } else {
                this.inputNumber('firstNum', text)
                this.resultBackups = null
            }

            // console.log(this.firstNum, ' ', this.operator, ' ', this.lastNum)
        }
        updateClear(): void {
            this.clearCalculator()
            this.span.textContent = '0'
        }
        updateResult(holdFirstNum: boolean = true): void {
            let result: number
            if (this.operator && this.firstNum && this.lastNum) {
                // console.log(this.firstNum, ' ', this.operator, ' ', this.lastNum)
                result = this.getResult()
                this.result = result.toPrecision(12).replace(/(0+$)|(\.0+$)/g, '').replace(/([^0]0+e)|(\.0+e)/g, 'e')
                this.span.textContent = this.result
                this.clearCalculator(holdFirstNum)
            } else {
                alert('请正确操作计算器')
            }
        }
        updateOperator(text: string): void {
            if (this.result) {
                this.firstNum = this.result
            }
            if (this.resultBackups) {
                this.firstNum = this.resultBackups
            }
            if (this.operator && this.firstNum && this.lastNum) {
                this.updateResult(false)
            }
            this.operator = text
            // console.log(this.firstNum, ' ', this.operator, ' ', this.lastNum)
        }
        getResult(): number {
            if (this.operator === '+') {
                return parseFloat(this.firstNum) + parseFloat(this.lastNum)
            } else if (this.operator === '-') {
                return parseFloat(this.firstNum) - parseFloat(this.lastNum)
            } else if (this.operator === '×') {
                return parseFloat(this.firstNum) * parseFloat(this.lastNum)
            } else if (this.operator === '÷') {
                return parseFloat(this.firstNum) / parseFloat(this.lastNum)
            }
        }
        bindEvents(): void {
            this.container.addEventListener('click', (event) => {
                if (event.target instanceof HTMLButtonElement) {
                    let text: string = event.target.textContent
                    if ('1234567890.'.indexOf(text) >= 0) {
                        this.updateNumber(text)
                    } else if ('÷×+-'.indexOf(text) >= 0) {
                        this.updateOperator(text)
                    } else if (text === 'Clear') {
                        this.updateClear()
                    } else if (text === '=') {
                        this.updateResult()
                    }
                }
            })
        }
    }
    new Calculator()
}