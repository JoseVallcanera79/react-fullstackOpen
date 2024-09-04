import React, { useState } from "react";

const Agenda = () => {
    const [newName, setNewName] = useState(''); // Para añadir nuevo nombre
    const [newNumber, setNewNumber] = useState(''); // Para añadir nuevo número
    const [searchName, setSearchName] = useState(''); // Para búsqueda
    const [personas, setPersonas] = useState([
        { id: 1, nombre: 'Jose', telefono: '1234567890' }
    ]);
    const [filteredPersonas, setFilteredPersonas] = useState([]); // Inicialmente vacío

    const [errorMessage, setErrorMessage] = useState('');

    // Función para manejar la adición de una nueva persona
    const addNombre = (event) => {
        event.preventDefault();

        if (newName.trim() === '') {
            setErrorMessage('Debe insertar un nombre');
            return;
        } else if (newNumber.trim() === '') {
            setErrorMessage('Debe insertar un teléfono');
            return;
        }

        const existePersona = personas.some(persona => persona.nombre.toLowerCase() === newName.toLowerCase());
        if (existePersona) {
            alert('Error. La persona ya existe en la base de datos');
            return;
        }

        const newPersona = {
            id: personas.length + 1,
            nombre: newName,
            telefono: newNumber
        };

        const updatedPersonas = [...personas, newPersona];
        setPersonas(updatedPersonas);

        console.log('Nueva persona:', newPersona); // Mostrar la persona


        setNewName(''); // Limpiar el campo de añadir nombre
        setNewNumber(''); // Limpiar el campo de añadir teléfono
        setErrorMessage('');
    };

   // Función para manejar la búsqueda
   const buscarNombre = () => {
    if (searchName.trim() === '') {
        setErrorMessage('Debe ingresar un nombre para buscar');
        return;
    }

    const resultado = personas.filter(persona =>
        persona.nombre.toLowerCase().includes(searchName.toLowerCase())
    );

    if (resultado.length === 0) {
        alert('Error. Esta persona no está en la base de datos');
    } else {
        setErrorMessage(''); // Limpiar mensaje de error si se encuentran resultados
    }

    console.log('Resultado búsqueda:', resultado);
    setFilteredPersonas(resultado); 
    setSearchName(''); // Limpiar búsqueda
};


    const eliminarPersonas = () => {
        setPersonas([]);
        setFilteredPersonas([]); // Vaciar también los resultados de búsqueda
        setNewName('');
        setNewNumber('');
        setSearchName(''); // Limpiar el campo de búsqueda
        setErrorMessage('');
    };

    const vaciarBusqueda = () => {
        setSearchName(''); // Limpiar el campo de búsqueda

    }

    // Función combinada para buscar y vaciar búsqueda
    const handleBuscar = () => {
        buscarNombre();
        vaciarBusqueda();
    };

    return (
        <div>
            <h2>Phonebook</h2>

            {/* Sección de búsqueda */}
            <div>
                Buscar por nombre:
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}

                />

                <button type="button" onClick={handleBuscar}>Buscar</button>


            </div>



            {/* Formulario para añadir una nueva persona */}
            <form onSubmit={addNombre}>
                <div>
                    Nombre:
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    Teléfono:
                    <input
                        type="text"
                        value={newNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) { // Solo permitir números
                                setNewNumber(value);
                            }
                        }}
                    />
                </div>
                <div>
                    <button type="submit">Añadir</button>
                    <button type="button" onClick={eliminarPersonas}>Eliminar</button>
                </div>

            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Mostrar todas las personas */}
            <h2>Números</h2>
            <ul>
                {personas.map(persona => (
                    <li key={persona.id}>
                        Nombre: {persona.nombre} - Teléfono: {persona.telefono}
                    </li>
                ))}
            </ul>

            {/* Mostrar resultados de búsqueda */}
            <h2>Resultados de la Búsqueda</h2>
            <ul>
                {filteredPersonas.map(persona => (
                    <li key={persona.id}>
                        Nombre: {persona.nombre} - Teléfono: {persona.telefono}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Agenda;
