import React from "react";


const Ejer15 = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
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
    }

    


  
    return (
      <div>
        <div>{course.name}</div>
        {course.parts.map((parts, index) => (
            <div key = {index}>
            <span>Name: {parts.name}</span>
            <span> &nbsp;Exercises: {parts.exercises}</span>
            </div>
        ))}
      </div>
    )
  }

  export default Ejer15