import React, { useState } from 'react';

import CalcButton from '../components/CalcButton';


// 計算機 App
function CalcApp(props) {
  const [firstclkop, setfirstClkop] = useState(false)
  const isfirstClkop = (tf) => setfirstClkop(tf)
  const [isOp, setIsOp] = useState(false)
  const storeisOp = (tf) => setIsOp(tf)
  const [show, setShow] = useState(0)
  const resetShow = () => setShow(0 * show)
  const storeValShow = (e) => setShow(10 * show + e)
  const EqualShow = (e) => setShow(e)
  const [oper, setOper] = useState('None')
  const storeOper = (op) => setOper(op)
  const [buffer, setBuffer] = useState(0)
  const storeBuffer = (buf) => setBuffer(buf)
  const [eqoper, seteqOper] = useState('None')
  const storeeqOper = (op) => seteqOper(op)
  const [eqval, seteqVal] = useState('None')
  const storeEqVal = (buf) => seteqVal(buf)

  function resetState() {
    isfirstClkop(false)
    storeisOp(false)
    storeOper('None')
    storeeqOper("None")
    storeBuffer(0)
    storeEqVal(0)
    storeValShow(0)
    resetShow()
  }
  function DoNum(_num) {
    if (isOp) {
      EqualShow(_num)
    }
    else {
      storeValShow(_num)
    }
    isfirstClkop(false)
    storeisOp(false)
  }
  function DoOper(_op) {
    let value_buffer,value_show,op_eq,value_eq
    let result
    let prev_op = oper
    storeOper(_op)
    if (prev_op === "None") {
      isfirstClkop(true)
      storeBuffer(show) //put in buffer
    }
    else {
      if (prev_op !== "=") {
        if (!isOp) {
          result = Calculate(oper,buffer,show)
          value_buffer = result
          value_show = result
          value_eq = show
          op_eq = prev_op
        }
        else if(isOp&&_op==='='){
          result = Calculate(oper,buffer,buffer)
          value_eq = buffer
          op_eq = prev_op
          value_buffer = buffer
          value_show = result
        }
        else{
          value_eq = buffer
          op_eq = prev_op
          value_buffer = buffer
          value_show = show
        }
      }
      else {
        if(_op==="="){
          if(eqoper!=="None")
            result = Calculate(eqoper,show,eqval)
          else 
            result = buffer
          value_buffer = buffer
          value_show = result
        }
        else {
          value_buffer = show
          value_show = show
        }
        value_eq = eqval
        op_eq = eqoper
      }
      isfirstClkop(false)
      storeBuffer(value_buffer)
      EqualShow(value_show)
      storeeqOper(op_eq)
      storeEqVal(value_eq)
    }
    storeisOp(true)
  }
  function Calculate(_oper,_a,_b) {
    let ans
    if (_oper === "÷") ans = _a / _b
    else if (_oper === "×") ans = _a * _b
    else if (_oper === "+") ans = _a + _b
    else if (_oper === "-") ans = _a - _b
    let ans_string = String(ans)
    let n = ans_string.indexOf(".");
    if(Math.abs(ans)>=100000000) {
      if(ans>0) ans = ans.toExponential(5);
      else ans = ans.toExponential(4);
    }
    else if(Math.abs(ans)<=0.00000001){
      if(ans>0) ans = ans.toExponential(5);
      else ans = ans.toExponential(4);
    }
    else if(ans_string.length>10)
      ans=ans.toFixed(10-n)
    
    return ans
  }
  
  function showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  let answer = firstclkop ? buffer : show
  return (
    <div className="calc-app">
      <div className="calc-container">
        <div className="calc-output">
          <div className="calc-display">{answer}</div>
        </div>
        <div className="calc-row">
          <CalcButton onClick={resetState}>AC</CalcButton>
          <CalcButton onClick={showNotImplemented}>+/-</CalcButton>
          <CalcButton onClick={showNotImplemented}>%</CalcButton>
          <CalcButton className="calc-operator" onClick={() => DoOper("÷")}>÷</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onClick={() => DoNum(7)}>7</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(8)}>8</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(9)}>9</CalcButton>
          <CalcButton className="calc-operator" onClick={() => DoOper("×")}>×</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onClick={() => DoNum(4)}>4</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(5)}>5</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(6)}>6</CalcButton>
          <CalcButton className="calc-operator" onClick={() => DoOper("-")}>-</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onClick={() => DoNum(1)}>1</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(2)}>2</CalcButton>
          <CalcButton className="calc-number" onClick={() => DoNum(3)}>3</CalcButton>
          <CalcButton className="calc-operator" onClick={() => DoOper("+")}>+</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number bigger-btn" onClick={() => DoNum(0)}>0</CalcButton>
          <CalcButton className="calc-number">.</CalcButton>
          <CalcButton className="calc-operator" onClick={() => DoOper("=")}>=</CalcButton>
        </div>
      </div>
    </div>
  );

}

export default CalcApp;
