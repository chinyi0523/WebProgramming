import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      facade: 1980,
      prefix: 1980,
      operation: null,
      suffix: null,
    };
    this.resetState = this.resetState.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.appendNumber = this.appendNumber.bind(this);
    this.calculate = this.calculate.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.division = this.division.bind(this);
  }

  log(a, b) {
    return Math.log(b)/Math.log(a);
  }

  addition(a, b) {
    return a+b;
  }

  subtraction(a, b) {
    return a-b;
  }

  multiplication(a, b) {
    return a*b;
  }

  division (a, b) {
    let log = this.log(10, a/b);
    let fix = 7 - Math.ceil(log>0 ? log : 0);
    if (a%b===0)
      return a/b;
    else
      return (a/b).toFixed((fix>0 ? fix : 0));
  }

  remainder(a, b) {
    return a%b;
  }

  resetState() {
    // TODO
    this.setState({facade: 0, prefix: 0, suffix: null, operation: null});
  }

  changeSign() {
    this.setState({prefix: -this.state.prefix, });
  }

  setOperation(e) {
    const op = e.target.innerHTML;
    var operation = null;
    if (op==="+")
      operation = this.addition;
    else if (op==="-")
      operation = this.subtraction;
    else if (op==="%")
      operation = this.remainder;
    else if (op==="÷")
      operation = this.division;
    else if (op==="x")
      operation = this.multiplication;
    if (this.state.suffix)
      this.calculate();
    this.setState({operation: operation});
  }

  calculate() {
    if (!this.state.operation && !this.state.suffix) {
      this.setState({facade: this.state.prefix, suffix: null, });
    } else {
      const result = this.state.operation(this.state.prefix, this.state.suffix);
      this.setState({prefix: result, facade: result, suffix: null, });
    }
  }

  appendNumber(e) {
    // alert();
    const num = e.target.innerHTML;
    if (!this.state.operation) {
      const alter = parseInt(this.state.prefix.toString()+num);
      if (alter>=100000) {
        let log = Math.ceil(this.log(10, alter));
        this.setState({prefix: alter, facade:`${(alter/Math.pow(10, log-1)).toFixed(3)}e${log}`, });
      }
      else  
        this.setState({prefix: alter, facade: alter, });
    } else {
      if (!this.state.suffix) {
        const alter = parseInt(num);
        this.setState({suffix: alter, facade: alter, });
      }
      else {
        const alter = parseInt(this.state.suffix.toString()+num);
        this.setState({suffix: alter, facade: alter, });
      }
    }
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.facade}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.changeSign}>+/-</CalcButton>
            <CalcButton onClick={this.setOperation}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperation}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.appendNumber}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperation}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.appendNumber}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperation}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.appendNumber}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.setOperation}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.appendNumber}>0</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>00</CalcButton>
            <CalcButton className="calc-number" onClick={this.appendNumber}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.calculate}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
