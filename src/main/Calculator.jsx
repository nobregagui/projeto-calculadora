import React, { Component } from "react";

import './Calculator.css'

import Button from "../components/Button";

import Display from "../components/Display";


const initialState = {
    displayValue: '0',
    clearDisplay: true,
    operation: null,
    values: [0, 0],
    current: 0
}


export default class Calculator extends Component {
    state = {...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDIgit = this.addDIgit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})

        }else {
            const finish = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            

            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                values
            })
        }
    }

    addDIgit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        const currentValue = clearDisplay? '' : this.state.displayValue

        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay:false})

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
                this.setState({ values })
                console.log(values)
        }
    }


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="Ac" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDIgit} />
                <Button label="8" click={this.addDIgit} />
                <Button label="9" click={this.addDIgit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDIgit} />
                <Button label="5" click={this.addDIgit} />
                <Button label="6" click={this.addDIgit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDIgit} />
                <Button label="2" click={this.addDIgit} />
                <Button label="3" click={this.addDIgit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDIgit} double />
                <Button label="." click={this.addDIgit} />
                <Button label="=" click={this.setOperation} operation />
                
            </div>
        )
    }
}