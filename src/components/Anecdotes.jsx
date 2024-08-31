import React, { useState } from "react";

const Anecdotes = () => {
    const anecdotes = [
        "Anécdota 1: El sol sale por el este.",
        "Anécdota 2: El agua hierve a 100°C.",
        "Anécdota 3: El espacio es frío.",
        "Anécdota 4: Los delfines son mamíferos.",
        "Anécdota 5: El Monte Everest es la montaña más alta del mundo.",
    ];
    var filtro = anecdotes.filter(anecdote => anecdote === "Anécdota 1: El sol sale por el este."); console.log(filtro)
    console.log(filtro); // Esto imprimirá un array con la anécdota filtrada


    const [selectedIndex, setSelectedIndex] = useState(null);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    const handleRandomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelectedIndex(randomIndex);
    };

    const handleVote = () => {
        if (selectedIndex !== null) {
            const newVotes = [...votes];
            newVotes[selectedIndex] += 1;
            setVotes(newVotes);
        }
    };

    const reseteo = () => {

        setVotes(Array(anecdotes.length).fill(0));
    }


    const mayorVots = votes.indexOf(Math.max(...votes));



    return (
        <div>
            <h1>Anecdota del día</h1>
            {selectedIndex !== null ? (
                <>
                    <p>{anecdotes[selectedIndex]}</p>
                    <p>Votos: {votes[selectedIndex]}</p>
                </>
            ) : (
                <p>Selecciona una anécdota</p>
            )}
            <button onClick={handleRandomAnecdote}>Seleccionar Anecdota Aleatoria</button>
            <button onClick={handleVote} disabled={selectedIndex === null}>Votar</button>
            <button onClick={reseteo}>Reset</button>

            <h2>Resultados de Votos</h2>
            <ul>
                {anecdotes.map((anecdote, index) => (
                    <li key={index}>
                        {anecdote} - Votos: {votes[index]}
                    </li>
                ))}
            </ul>
            <p>El mayor Punto de votos es para:</p>
            {votes[mayorVots] > 0 ? (
                <p>{anecdotes[mayorVots]} - Votos: {votes[mayorVots]}</p>
            ) : (<p>¡¡No hay votos!!</p>)
            }

            <p>Retorna el filtro: {filtro}</p>
        </div>
    );
};

export default Anecdotes;
