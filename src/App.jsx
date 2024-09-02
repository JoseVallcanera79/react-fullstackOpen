import React, { useState } from "react";
import Header from "./components/header.jsx";
import Content from "./components/Content.jsx";
import Total from "./components/Total.jsx";
import Ejer13 from "./components/Ejer13.jsx";
import Ejer14 from "./components/Ejer14.jsx";
import Ejer15 from "./components/Ejer15.jsx";
import Ejer16 from "./components/Ejer16.jsx";
import Ejer17 from "./components/Ejer17.jsx";
import Anecdotes from "./components/Anecdotes.jsx";
import Note from "./components/Note.jsx"
import Course from "./components/Course.jsx";

const Hello = (props) => {
    const { name, age, birthMonth } = props;
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril',
        'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];




    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (birthMonth > currentMonth) {
            return yearNow - age - 1;
        } else {
            return yearNow - age;
        }
    };

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()} if you were born in month {months[birthMonth - 1]}</p>
        </div>
    );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    );
};




const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>        the app is used by pressing the buttons      </div>)
    } return (<div>      button press history: {props.allClicks.join(' ')}    </div>)
}



const ButtonIncrement = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)


const App = (props) => {
    const [counter, setCounter] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const handleIncrement = () => {
        setCounter(counter + 1);
    };

    const handleDecrement = () => {
        setCounter(counter - 1);
    };

    const handleReset = () => {
        setCounter(0);
    };

    const handleResetComplex = () => {
        setLeft(0);
        setRight(0);
    };

    const [clicks, setClicks] = useState({ left: 0, right: 0 });

    const handleLeftClick = () => {
        setClicks(prevClicks => ({ left: prevClicks.left + 1, right: prevClicks.right }));
    };

    const handleRightClick = () => {
        setClicks(prevClicks => ({ left: prevClicks.left, right: prevClicks.right + 1 }));
    };

    const handleResetClick = () => {
        setClicks({ left: 0, right: 0 });
    };

    const [leftArray, setLeftArray] = useState(0);
    const [rightArray, setRightArray] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClickArray = () => {
        console.log('Left clicks before:', leftArray);
        setAll(prevAll => [...prevAll, 'L']);
        setLeftArray(prevLeft => {
            const newLeft = prevLeft + 1;
            console.log('Left clicks after:', newLeft);
            return newLeft;
        });
    };

    const handleRightClickArray = () => {
        console.log('Right clicks before:', rightArray);
        setAll(prevAll => [...prevAll, 'R']);
        setRightArray(prevRight => {
            const newRight = prevRight + 1;
            console.log('Right clicks after:', newRight);
            return newRight;
        });
    };

    const handleResetArray = () => {
        setLeftArray(0);
        setRightArray(0);
        setAll([]);
    };

    const totalL = leftArray;
    const totalR = rightArray;

    console.log('Total L:', totalL);
    console.log('Total R:', totalR);

    const name = 'Eduardo';
    const age = 44;
    const birthMonth = 11;


    //Funcion que devuelve una funcion

    const [value, setValue] = useState(0)

    const setToValue = (newValue) => () => {
        console.log('value now', newValue); // imprime el nuevo valor en la consola   
        setValue(newValue);
    };

    const handleThousand = () => {
        if (value > 0) {
            console.log('value incremented by 1000 + current value');
            setValue(value + 1000);
        }

    };

    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            important: true
        }
    ]

    console.log(notes);


    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
    } 

        return (
            <div>
                <Header /><br />
                <Content /><br />
                <Total /><br />

                <p>Ejercicio 1.2</p>
                <Anecdotes />

                <p>Ejercicio 1.3</p>
                <Ejer13 />

                <p>Ejercicio 1.4</p>
                <Ejer14 />

                <p>Ejercicio 1.5</p>
                <Ejer15 />

                <p>Ejercicio 1.6</p>
                <Ejer16 />

                <p>Ejercicio 1.7</p>
                <Ejer17 />

                <h1>Eventos Props</h1>
                <div>
                    <h3>Greetings</h3>
                    <Hello name="Maya" age={34 + 10} birthMonth={12} />
                    <Hello name={name} age={age} birthMonth={birthMonth} />
                </div>

                <p>Contador</p>
                <div>
                    <Display counter={counter} />
                    <Button onClick={handleIncrement} text='Increment' />
                    <Button onClick={handleReset} text='Zero' />
                    <Button onClick={handleDecrement} text='Decrement' />
                </div>

                <p>Contador Complejo</p>
                <div>
                    {left}
                    <button onClick={() => setLeft(left + 1)}>left</button>
                    {right}
                    <button onClick={() => setRight(right + 1)}>right</button>
                    <button onClick={handleResetComplex}>Reset Complex</button>
                </div>

                <p>Guardar variables</p>
                <div>
                    {clicks.left}
                    <button onClick={handleLeftClick}>left</button>
                    <button onClick={handleRightClick}>right</button>
                    {clicks.right}
                    <button onClick={handleResetClick}>Reset</button>
                </div>

                <p>Arrays</p>
                <div>
                    <button onClick={handleLeftClickArray}>left</button>
                    <button onClick={handleRightClickArray}>right</button>
                    <button onClick={handleResetArray}>Reset</button>

                    <p>{allClicks.join(' ')}</p>
                    <p>Total L: {totalL}</p>
                    <p>Total R: {totalR}</p>
                </div>

                <p>HISTORY PROPS</p>
                <div>
                    {left}
                    <button onClick={handleLeftClick}>left</button>
                    <button onClick={handleRightClick}>right</button>
                    {right}
                    <History allClicks={allClicks} />
                </div>

                <p>Funcion que devuelve una funcion</p>
                <div>
                    {value}
                    <button onClick={setToValue(handleThousand)}>thousand</button>
                    <button onClick={setToValue(0)}>reset</button>
                    <button onClick={setToValue(value + 1)}>increment</button>
                </div>

                <p>Funcion text</p>
                <div>
                    {value}
                    <ButtonIncrement handleClick={setToValue(handleThousand)} text="thousand" />
                    <ButtonIncrement handleClick={setToValue(0)} text="cero" />
                    <ButtonIncrement handleClick={setToValue(value + 1)} text="increment" />
                </div>


                <div>
                    <Note initialNotes={notes} />
                </div>
                <div>
                    <Course />
                </div>
            </div>
        );
    };

    export default App;
