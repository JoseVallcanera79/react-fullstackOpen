import React from "react";

const Course = () => {

    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <h1>Courses</h1>
            {courses.map(course => {
                const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
                return (
                    <div key={course.id}>
                        <h2>{course.name}</h2>
                        <ul>
                            {course.parts.map(part => (
                                <li key={part.id}>
                                    {part.name}: {part.exercises} exercises
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total exercises for {course.name}:</strong> {totalExercises}</p>
                    </div>
                );
            })}
            <h2>Total courses: {courses.length}</h2>
            <h2>
                Total exercises across all courses: {courses.reduce((total, course) => {
                    return total + course.parts.reduce((sum, part) => sum + part.exercises, 0);
                }, 0)}
            </h2>
        </div>
    );
}

export default Course;
