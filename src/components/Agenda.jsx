import React, { useState } from "react";

const Agenda = () => {
    const [newName, setNewName] = useState('');
    const [newNumbers, setNewNumbers] = useState('')
    const [personas, setPersonas] = useState([
        { id: 1, nombre: 'Jose' }
    ]);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores

    // Función para manejar el submit del formulario
    const addNombre = (event) => {
        event.preventDefault();

        if (newName.trim() === '') {
            setErrorMessage('Debe insertar un nombre');
            return
        } else if (newNumbers.valueOf() === '') {
            setErrorMessage('Debe insertar un telefono');
            return;
        }

        // Verificar IDs existentes y generar un nuevo ID único
        const existingIds = new Set(personas.map(persona => persona.id));
        let newId = 1;
        while (existingIds.has(newId)) {
            newId++;
        }

        // Crear un nuevo objeto para la persona
        const newPersona = {
            id: newId,
            nombre: newName,
            telefono: newNumbers
        };

        // Verificar si la persona ya existe en la lista
        const existePersona = personas.some(persona => persona.nombre.toLowerCase() === newName.toLowerCase());
        if (existePersona) {
            console.log('Error. La persona ya existe en la base de datos:', (existePersona))
            alert('Error. La persona ya existe en la base de datos');
            return;
        }
        console.log('Error. La persona ya existe en la base de datos:', (existePersona))

        // Log de la nueva persona que se está agregando
        console.log('Añadiendo nueva persona:', newPersona);


        // Actualizar el estado con la nueva persona
        const updatedPersonas = [...personas, newPersona]; // Asegúrate de crear un nuevo array plano
        setPersonas(updatedPersonas);

        // Log del estado actualizado
        console.log('Personas después de la actualización:', updatedPersonas);

        setNewName(''); // Limpiar el input después de agregar
        setNewNumbers(''); // Limpiar el input después de agregar
        setErrorMessage(''); // Limpiar mensaje de error después de agregar
    };

    // Función para eliminar todas las personas
    const eliminarPersonas = () => {
        setPersonas([]);
        setNewName('');
        setNewNumbers('')
        setErrorMessage('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNombre}>
                <div>
                    name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                    phone: 
                    <input 
                        type="text" 
                        max="10"
                        value={newNumbers} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value) && !value.includes('-') && !value.includes('.')) {
                                setNewNumbers(value);
                            }
                        }} 
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                    <button type="button" onClick={eliminarPersonas}>Eliminar</button>
                </div>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <h2>Numbers</h2>
            <ul>
                {personas.map(persona => (
                    <li key={persona.id}>nombre: {persona.nombre} Telefono: {persona.telefono}</li>
                ))}
            </ul>
        </div>
    );
}

export default Agenda;
