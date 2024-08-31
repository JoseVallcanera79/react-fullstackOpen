import React from "react";

const Content = () =>{
    const part1 = 'Fundamentals of React'
    const part2 = 'Using props to pass data'
    const part3 = 'State of a component'

    return(

        <div>
            <div>Parte 1: {part1}</div>
            <div>Parte 2: {part2}</div>
            <div>Parte 3: {part3}</div>
        </div>
    );
};

export default Content