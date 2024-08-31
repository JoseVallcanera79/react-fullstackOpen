import React, { useState } from "react";

const Ejer16 = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [letterCount, setLetterCount] = useState(0)
    const [totalComent, setTotalComent] = useState(0)


    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value);
        setLetterCount(value.length)
    };



    const handleComment = () => {

        if (letterCount > 10) {
            console.log('El comentario es bueno');
            setGood(good + 1);

        } else if (letterCount === 0) {
            console.log("Error. Inserta caracteres")
            return


        } else if (letterCount >= 5) {
            console.log('Es un comentario neutro');
            setNeutral(neutral + 1);
        } else if (letterCount < 5) {
            //clg + enter -> hace esto
            console.log('%cEste es un comentario malo', 'color: #007acc;', { letterCount, badCount: bad + 1 });
            setBad(bad + 1);
        }

        setTotalComent(totalComent + 1)
        if (totalComent + 1 > 10) {
            resetComent()
        }
    };

    const resetComent = () => {
        if (totalComent > 10) {
            setGood(0)
            setBad(0)
            setNeutral(0)
            setLetterCount(0);
            setTotalComent(0)


        }
        setInputValue('');

    }


    const calcMedia = () => {
        return (good + bad + neutral) / 3
    }


    const positives = () => {

        if (totalComent > 0) {
            return ((good / totalComent) * 100)
        }
        return 0
    }




    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ingresa un valor"
            />
            <button onClick={handleComment}>Evaluar Comentario</button>
            <button onClick={resetComent}>Reset</button>

            <div>
                <p>Good: {good}</p>
                <p>Neutral: {neutral}</p>
                <p>Bad: {bad}</p>
                <p>Letter: {letterCount}</p>
                <p>TotalInputs: {totalComent}</p>
                <p>Media: {calcMedia().toFixed(2)}</p>
                <p>Positives: {positives().toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default Ejer16;
