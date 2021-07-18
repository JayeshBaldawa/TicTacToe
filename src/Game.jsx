import { React, useState } from 'react'

const Game = () => {
    const [board, markPositionOnBoard] = useState([[],[],[]]);
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState("")

    const handlePress = (row, column) => {
        const newBoard = board.slice();
        if (newBoard[row][column] === undefined) {
            newBoard[row][column] = player;
            markPositionOnBoard(newBoard)
            if(isGameOvered())
            {
                setWinner("Player "+(player+1)+" has won this game");
            }
            else
            {
                if(isGameDrawn())
                {
                    setWinner("Game is drawn")
                }
                setPlayer(1 - player);
            }
        }
    };


    const isGameDrawn = () =>
    {
        if( board[0].length ===3 && board[1].length === 3 && board[2].length === 3)
        {
            for(let i=0;i<3;i++)
            {
                for(let j=0;j<3;j++)
                {
                    if(board[i][j] === undefined)
                        return false
                }
            }
        }
        else
            return false;    
        return true;   
    }

    const isGameOvered = () => {
        return rowCrossed() || columnCrossed() || diagonalCrossed();
    }

    const rowCrossed = () => {
        for(let i=0;i<3;i++)
        {
            if(board[i][0]===board[i][1] && board[i][1]===board[i][2] && board[i][0]!== undefined)
                return true;
        }
        return false;
    };

    const columnCrossed = () => {
        for(let j=0;j<3;j++)
        {
            if(board[0][j]===board[1][j] && board[1][j]===board[2][j] && board[0][j]!== undefined)
                return true;
        }
        return false;
    };

    const diagonalCrossed = () => {
            if(board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0]!== undefined)
                return true;
            if(board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2]!== undefined)
                return true;    
        return false;
    }


    const handleClear = () =>
    {
        setWinner("");
        setPlayer(0);
        markPositionOnBoard([[],[],[]])
    }


    const getBoxView = (row, column) => (
        <>
            {
                board[row][column] === 0 ? <img src="cross.png" alt="cross" width="30px" height="30px" /> : board[row][column] === 1 ? <img src="circle.png" alt="circle" width="30px" height="30px" /> : ""
            }
        </>
    )

    return (
        <div className="container">
            <h1> TIC TAC TOE GAME</h1>
            <div className="controls">
                <button onClick={handleClear} className="clear">START NEW GAME</button>
            </div>
            <div className="player">
                <div className={"player1 " + (player === 0 ? "turn" : "wait")}>PLayer 1</div>
                <div className={"player2 " + (player === 1 ? "turn" : "wait")}>PLayer 2</div>
            </div>
            <div className="winner">{winner}</div>
            <div className="table_wrapper">
                <table>
                    <tbody>
                        <tr>
                            <td onClick={() => winner.length===0 ? handlePress(0,0) : ""}>
                                {getBoxView(0,0)}
                            </td>
                            <td onClick={() =>winner.length===0 ?  handlePress(0,1) : ""}>
                                {getBoxView(0,1)}
                            </td>
                            <td onClick={() => winner.length===0 ?  handlePress(0,2) : ""}>
                                {getBoxView(0,2)}
                            </td>
                        </tr>
                        <tr>
                            <td onClick={() => winner.length===0 ? handlePress(1,0) : ""}>
                                {getBoxView(1,0)}
                            </td>
                            <td onClick={() => winner.length===0 ?  handlePress(1,1) : ""}>
                                {getBoxView(1,1)}
                            </td>
                            <td onClick={() => winner.length===0 ?  handlePress(1,2) : ""}>
                                {getBoxView(1,2)}
                            </td>
                        </tr>
                        <tr>
                            <td onClick={() => winner.length===0 ?  handlePress(2,0) : ""}>
                                {getBoxView(2,0)}
                            </td>
                            <td onClick={() => winner.length===0 ? handlePress(2,1) : ""}>
                                {getBoxView(2,1)}
                            </td>
                            <td onClick={() => winner.length===0 ?  handlePress(2,2) : ""}>
                                {getBoxView(2,2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Game;