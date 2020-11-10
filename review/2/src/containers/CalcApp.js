import React from 'react';

import CalcButton from '../components/CalcButton';

// state 0: init state
// state 1: change num and push
// state 2: change op and push

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      dataStack: ['0'],
      display: '0',
      curState: 0,
      history: {num: '0', op: '+'}
    };
  }

  //// button function
  // AC
  resetState = (dis) => {
    // TODO
    this.setState({dataStack: ['0'], display: dis, curState: 0, history: {num: '0', op: '+'}});
  }

  handleNum = numstr => {
    switch (this.state.curState) {
      case 0:
        if (numstr === '0')
          this.setState({dataStack: ['0'], display: '0', curState: 0});
        else
          this.setState({dataStack: [numstr], display: numstr, curState: 1});
        break;
      case 1:
        let new_numstr = '';
        if (this.state.dataStack[this.state.dataStack.length - 1] === '0') {
          if (numstr === '0') return;
          new_numstr = numstr;
        }
        else {
          new_numstr = this.state.dataStack[this.state.dataStack.length - 1] + numstr;
        }
        let s1 = [...this.state.dataStack];
        s1.pop();
        s1.push(new_numstr);
        this.setState({dataStack: s1, display: new_numstr, curState: 1});
        break;
      case 2:
        let ret1 = this.updateStack([]);
        if (ret1.display === 'Error') {
          this.resetState(ret1.display);
        }
        else {
          ret1.stack.push(numstr);
          this.setState({dataStack: ret1.stack, display: numstr, curState: 1});
        }
        break;
      default:
        alert("CURSTATE ERROR");
    }
  }

  handleOp = opstr => {
    switch (this.state.curState) {
      case 0:
        let s1 = [...this.state.dataStack];
        s1.push(opstr);
        this.setState({dataStack: s1, display: s1[0], curState: 2});
        break;
      case 1:
        let s2 = [...this.state.dataStack];
        s2.push(opstr);
        let dis1 = this.updatePseudoStack([opstr], false);
        if (dis1 === 'Error') {
          this.resetState(dis1);
        }
        else
          this.setState({dataStack: s2, display: dis1, curState: 2});
        break;
      case 2:
        let s3 = [...this.state.dataStack];
        s3.pop();
        s3.push(opstr);
        let dis2 = this.updatePseudoStack([opstr], true);
        if (dis2 === 'Error') {
          this.resetState(dis2);
        }
        else
          this.setState({dataStack: s3, display: dis2, curState: 2});
        break;
      default:
        alert("CURSTATE ERROR");
    }
  }

  handleEq = () => {
    switch (this.state.curState) {
      case 0:
        let arr1 = [this.state.history.op, this.state.history.num, '='];
        let ret1 = this.updateStack(arr1);
        if (ret1.display === 'Error') {
          this.resetState(ret1.display);
        }
        else
          this.setState({dataStack: ret1.stack, display: ret1.display, curState: 0});
        break;
      case 1:
        let history1 = {...this.state.history};
        if (this.state.dataStack.length > 1)
          history1 = {num: this.state.dataStack[this.state.dataStack.length - 1], op: this.state.dataStack[this.state.dataStack.length - 2]};
        let ret2 = this.updateStack(['=']);
        if (ret2.display === 'Error') {
          this.resetState(ret2.display);
        }
        else
          this.setState({dataStack: ret2.stack, display: ret2.display, curState: 0, history: history1});
        break;
      case 2:
        let history2 = {num: this.state.display, op: this.state.dataStack[this.state.dataStack.length - 1]};
        let arr2 = [this.state.display, '='];
        let ret3 = this.updateStack(arr2);
        if (ret3.display === 'Error') {
          this.resetState(ret3.display);
        }
        else
          this.setState({dataStack: ret3.stack, display: ret3.display, curState: 0, history: history2});
        break;
      default:
        alert("CURSTATE ERROR");
    }
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  //// utilities
  updateStack = (arr) => {
    let s = [...this.state.dataStack];
    let dis = 'Error';
    if (arr.length) {
      s = s.concat(arr);
    }
    let op = s.pop();
    if (this.state.curState === 2 && op === '=') {
      // s.length >= 3
      let tmpNum = s.pop();
      let tmpOp = s.pop();
      while (s.length >= 3) {
        let opstr = s[s.length - 2];
        if (this.getPriority(opstr) < this.getPriority(tmpOp)) {
          break;
        }
        else {
          let numstrR = s.pop();
          s.pop();
          let numstrL = s.pop();
          let result = this.calculate(parseFloat(numstrL), parseFloat(numstrR), opstr);

          if (result === 'Error') {
            return {display: dis, stack: s}; // dis === 'Error'
          }
          s.push(result.toString());
        }
      }
      s.push(tmpOp);
      s.push(tmpNum);
    }
    if (s.length === 1) {
      if (op === '=') {
        s.push(this.state.history.op);
        s.push(this.state.history.num);
        let numstrR = s.pop();
        let opstr = s.pop();
        let numstrL =  s.pop();
        let result = this.calculate(parseFloat(numstrL), parseFloat(numstrR), opstr);
        if (result === 'Error') {
          return {display: dis, stack: s}; // dis === 'Error'
        }
        dis = result.toString();
        s.push(dis);
      }
      else dis = s[s.length - 1];
    }
    else if (s.length >= 3) {
      while (s.length >= 3) {
        let opstr = s[s.length - 2];
        if (this.getPriority(opstr) < this.getPriority(op)) {
          dis = s[s.length - 1];
          break;
        }
        else {
          let numstrR = s.pop();
          s.pop();
          let numstrL = s.pop();
          let result = this.calculate(parseFloat(numstrL), parseFloat(numstrR), opstr);

          if (result === 'Error') {
            return {display: dis, stack: s}; // dis === 'Error'
          }
          dis = result.toString();
          s.push(dis);
        }
      }
    }
    else alert("UPDATESTACK_ERROR");

    if (op !== '=') 
        s.push(op);
    return {display: dis, stack: s};
  }
  updatePseudoStack = (arr, dopop) => {
    let s = [...this.state.dataStack];
    let dis = 'Error';
    if (dopop) {
      s.pop();
    }
    if (arr.length) {
      s = s.concat(arr);
    }
    let op = s.pop();
    if (s.length === 1) {
      dis = s[s.length - 1];
    }
    else if (s.length >= 3) {
      while (s.length >= 3) {
        let opstr = s[s.length - 2];
        if (this.getPriority(opstr) < this.getPriority(op)) {
          dis = s[s.length - 1];
          break;
        }
        else {
          let numstrR = s.pop();
          s.pop();
          let numstrL = s.pop();
          let result = this.calculate(parseFloat(numstrL), parseFloat(numstrR), opstr);

          if (result === 'Error') {
            return dis; // dis === 'Error'
          }

          dis = result.toString();
          s.push(dis);
        }
      }
    }
    else alert("UPDATEPSEUDOSTACK_ERROR");

    if (op !== '=') 
        s.push(op);
    return dis;
  }
  calculate = (n1, n2, opstr) => {
    let result = 0;
    switch (opstr) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case '*':
        result = n1 * n2;
        break;
      case '/':
        if (n2 === 0) {
          // alert("MathError");
          return "Error";
        }
        else 
          result = n1 / n2;
        break;
      default:
        alert("OPERATOR ERROR");
    }
    return result;
  }
  getPriority = (opstr) => {
    let pri = 0;
    switch (opstr) {
      case '*': case '/':
        pri = 2;
        break;
      case '+': case '-':
        pri = 1;
        break;
      case '=':
        pri = 0;
        break; 
      default:
        alert("OPERATOR ERROR");
    }
    return pri;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('dataStack:  ');
    console.log(this.state.dataStack);
    
    console.log('display:  ');
    console.log(this.state.display);

    console.log('curState:  ');
    console.log(this.state.curState);

    console.log('history:  ');
    console.log(this.state.history);
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={() => this.resetState('0')}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton onClick={() => this.handleOp('/')} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={() => this.handleNum('7')} className="calc-number">7</CalcButton>
            <CalcButton onClick={() => this.handleNum('8')} className="calc-number">8</CalcButton>
            <CalcButton onClick={() => this.handleNum('9')} className="calc-number">9</CalcButton>
            <CalcButton onClick={() => this.handleOp('*')} className="calc-operator">×</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={() => this.handleNum('4')} className="calc-number">4</CalcButton>
            <CalcButton onClick={() => this.handleNum('5')} className="calc-number">5</CalcButton>
            <CalcButton onClick={() => this.handleNum('6')} className="calc-number">6</CalcButton>
            <CalcButton onClick={() => this.handleOp('-')} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={() => this.handleNum('1')} className="calc-number">1</CalcButton>
            <CalcButton onClick={() => this.handleNum('2')} className="calc-number">2</CalcButton>
            <CalcButton onClick={() => this.handleNum('3')} className="calc-number">3</CalcButton>
            <CalcButton onClick={() => this.handleOp('+')} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={() => this.handleNum('0')} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton onClick={this.showNotImplemented} className="calc-number">.</CalcButton>
            <CalcButton onClick={() => this.handleEq()} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
