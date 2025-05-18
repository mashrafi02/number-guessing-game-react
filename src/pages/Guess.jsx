import { useState } from "react"
import "../css/Guess.css"

const Guess = () => {

  const [player1Input, setPlayer1Input] = useState("");
  const [player2Input, setPlayer2Input] = useState("");
  const [player3Input, setPlayer3Input] = useState("");
  const [isPlayer2, setIsPlayer2] = useState(false);
  const [isPlayer3, setIsPlayer3] = useState(false);
  const [player2Chances, setPlayer2Chances] = useState(5)
  const [player3Chances, setPlayer3Chances] = useState(5)
  const [isResult, setIsResult] = useState(false);

  function handlePlayer1Input(){
    if(player1Input.trim() == "" || isNaN(player1Input)){
      alert("Please Enter a Valid Number... !!!");
      return
    }
    if(player1Input.trim() > 10 || player1Input.trim() < 0){
      alert("Please Enter a Number between 0 and 10.");
      return
    }
    setIsPlayer2(true);
    return
  }

  function handlePlayer2Input(){
    let chanceLeft = player2Chances-1
    if(player2Chances >= 1){
      if (player1Input == player2Input){
        setIsPlayer2(false);
        setIsPlayer3(true);
        return
      }
      else{
        setPlayer2Chances(chanceLeft);
        if(chanceLeft == 0){
          setIsPlayer2(false);
          setIsPlayer3(true);
          return
        }
        setPlayer2Input("")
      }
    }
  }

  function handlePlayer3Input(){
    let chanceLeft = player3Chances-1
    if(player3Chances >= 1){
      if (player1Input == player3Input){
        setIsPlayer3(false);
        setIsResult(true);
        return
      }
      else{
        setPlayer3Chances(chanceLeft);
        if(chanceLeft == 0){
          setIsPlayer3(false);
          setIsResult(true)
          return
        }
        setPlayer3Input("")
      }
    }
  }

  function showResult() {
    if(player2Chances == player3Chances){
      return "The game is Draw!"
    }else if(player2Chances == 0 && player3Chances == 0){
      return "Player 1 wins !!!"
    }else if( player2Chances > player3Chances){
      return "Player 2 wins !!!"
    }else if(player2Chances < player3Chances){
      return "Player 3 wins !!!"
    }
  }

  function restartGame(){
    setIsResult(false);
    setPlayer1Input("");
    setIsPlayer2(false);
    setIsPlayer3(false);
    setPlayer2Input("");
    setPlayer3Input("");
    setPlayer2Chances(5);
    setPlayer3Chances(5)
  }

  return (
    <div className="game-container">
        <h1 className="title">Guess The Number</h1>

        {isResult && <h1 className="result">{showResult()} <button onClick={restartGame} type="submit">Restart Game</button></h1>}

        {!(isPlayer2 || isPlayer3 || isResult ) && (
          <form className="player-1-input" onSubmit={(e) => 
              e.preventDefault()
          }>
              <input type="password"
              placeholder="Player 1 , Enter your secret Number..."
              value={player1Input}
              onChange={(e) => setPlayer1Input(e.target.value)} />
              <button onClick={handlePlayer1Input} type="submit">Start Game</button>
          </form>
        )}

        {isPlayer2 && (
          <form className="player-2-input" onSubmit={(e) => 
            e.preventDefault()
        }>
            <span>Chances : {player2Chances}</span>
            <input type="text"
            placeholder="Player 2, try to guess now..."
            value={player2Input}
            onChange={(e) => setPlayer2Input(e.target.value)} />
            <button onClick={handlePlayer2Input} type="submit">Guess</button>
        </form>
        )}

        {isPlayer3 && (
          <form className="player-3-input" onSubmit={(e) => 
            e.preventDefault()
        }>
            <span>Chances : {player3Chances}</span>
            <input type="text"
            placeholder="Player 3, try to guess now..."
            value={player3Input}
            onChange={(e) => setPlayer3Input(e.target.value)} />
            <button onClick={handlePlayer3Input} type="submit">Guess</button>
        </form>
        )}
    </div>
  )
}

export default Guess