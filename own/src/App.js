import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'
import githubaccept from "./githubaccept.jpg";
function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
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
          <p>You won! The number was {number}.<br/><br/><br/>How long you spent on this HW?<br/><br/>I guess you spent more time on accepting HW5!!<br/><br/><img src={githubaccept} width="300px" alt="GitHub Accept Distribution"></img></p>
          <button
            onClick={async () => {
              await restart()

              setHasWon(false)
              setStatus('')
              setNumber('')
            }}
          >
            Restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between 1 to 100</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={async () => {
              const message = await guess(number)
              //message.catch(console.log("asdfg"))
              setStatus(message)
              if (message === "Correct"){
                setHasWon(true)
              }
            }}
            disabled={!number}
          >
            Guess!
          </button>
          <p>{status}</p>
        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
