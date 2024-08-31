import React from "react"


const Ejer13 = () => {
    const course = 'Half Stack application development.'
    const part1 = {
      name: 'Fundamentals of React.',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data.',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component.',
      exercises: 14
    }

    return(
        <div>
            <div>Curso: {course}</div>
            <div>Name: {part1.name} &nbsp; Excercices: {part1.exercises}</div>
            <div>Name: {part2.name} &nbsp;Excercices: {part2.exercises}</div>
            <div>Name: {part3.name} &nbsp; Excercices: {part3.exercises}</div>
        </div>
    )
  
  }

  export default Ejer13