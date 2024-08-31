import React from "react"

const Ejer14 = () => {
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

/*     console.log('Course:', course, 'Parts:', parts)
 */
    return (
        <div>
        <div>{course}</div>
        {parts.map((part, index) => (
          <div key={index}>
            <span>Name: {part.name}</span>
            <span> &nbsp;Exercises: {part.exercises}</span>
          </div>
        ))}
      </div>
    )
  }

  export default Ejer14