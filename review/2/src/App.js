import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(100);

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let msg = await startGame()
          console.log(msg)
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const game = (
    <div>
      {hasWon ? (
        <>
          <p>you won! the number was {number}.</p>
          <button
            onClick={async () => {
              await restart()

              setHasWon(false)
              setStatus('')
              setNumber('')
            }}
          >
            restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between {low} to {high}</p>
          <input
            id="inputNumber"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={ async () => {
              const input = document.getElementById("inputNumber");
              let res = await guess(input.value);
              
              console.log(res);
              if(res === 'guessed < number'){
                if(Number(input.value) > Number(low)){
                  setLow(input.value);
                }
                setStatus('Bigger');
              }else if(res === 'guessed > number'){
                console.log("curr high:" + high + " input.value:" + input.value);
                if(Number(input.value) < Number(high)){
                  setHigh(input.value);
                }
                setStatus('Smaller');
              }else if(res === 'guessed = number'){
                setHasWon(true);
                setLow(1);
                setHigh(100);
              }else{
                setStatus('It\'s not a number.');
              }
              
              input.value="";
            }}
            disabled={!number}
          >
            guess!
          </button>
          <p>{status}</p>
        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
