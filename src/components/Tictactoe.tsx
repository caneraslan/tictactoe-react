import Button from "./Button";
import { useState } from "react";

const About = () => {
    const [countEvent, setCountEvent] = useState(0);
    const next = countEvent % 2;
    const [history, setHistory] = useState([Array(9).fill('_')]);
    const squares = history[countEvent];

    const ClickToSquare = (itemKey: number) => {
        if (isFinishTheGame) {
            return null;
        } else {
            const prevSquare = squares.slice();
            prevSquare[itemKey] = (next === 0 ? 'X' : 'O');
            setCountEvent(countEvent + 1);
            const tempHistory = [...history.slice(0, countEvent + 1), prevSquare];
            setHistory(tempHistory);
        }
    }

    const ClickToEvents = (itemKey: number) => {
        const prevCount = itemKey;
        if (countEvent === prevCount || countEvent === 0) {
            return false;
        }
        else {
            setCountEvent(prevCount);
        }
    }

    const toWin = (lastChanged: any[]) => {

        const lastHistory = lastChanged;
        const arrayWinList = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]]

        const resultWin = arrayWinList.some(item => {
            const [a, b, c] = item;
            return lastHistory[a] === lastHistory[b] && lastHistory[a] === lastHistory[c] && lastHistory[a] != '_';
        })
        return resultWin;
    }


    const isFinishTheGame = toWin(squares);

    const moves = history.map((item, index) => {
        let description = ''
        let next = index % 2 == 0 ? 'O' : 'X';
        description = index == 0 ? 'Oyunun baslangici' : next + ' oynadigi hamle.';
        return <li> <button onClick={() => ClickToEvents(index)} key={index}> {description}</button> </li>
    })

    return (

            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <label className={'info' + (isFinishTheGame ? ' win' : ' lose')}>{
                        isFinishTheGame 
                        ? 'Kazanan Oyuncu : ' + (next % 2 == 0 ? 'O' : 'X') 
                        : 'Oynayacak Oyuncu :' + (next % 2 == 0 ? 'X' : 'O')
                        }</label>

                    </div>
                    <div className="squares col-6">
                        {
                            squares.map((item, index) =>
                                <>
                                    {index % 3 === 0 ? <br /> : null}
                                    <Button classname='ticbut' itemKey={index} onClick={ClickToSquare}>{item}</Button>
                                </>
                            )}
                    </div>

                    <div className="col-3">
                        <ol className='events'>{moves}</ol>
                    </div>
                </div>
            </div>
    )
}


export default About