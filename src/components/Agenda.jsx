import React, { useState, useEffect } from "react";
import axios from "axios";

const Agenda = () => {
    const [newName, setNewName] = useState(''); // Para añadir nuevo nombre
    const [newNumber, setNewNumber] = useState(''); // Para añadir nuevo número
    const [searchName, setSearchName] = useState(''); // Para búsqueda
    const [personas, setPersonas] = useState([]); // Inicia vacío, datos vendrán del backend
    const [filteredPersonas, setFilteredPersonas] = useState([]); // Inicialmente vacío
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect para cargar los datos del backend al cargar el componente
    useEffect(() => {
        fetchPersonas();
    }, []);

    const fetchPersonas = () => {
        axios.get('http://localhost:3002/personas')
            .then(response => {
                setPersonas(response.data);
            })
            .catch(error => {
                console.error('Error al cargar las personas:', error);
                setErrorMessage('Error al cargar las personas');
            });
    };

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

        // Crear el nuevo objeto antes de enviarlo al backend
        const newPersona = {
            nombre: newName,
            telefono: newNumber
        };

        // Hacer la solicitud POST
        axios.post('http://localhost:3002/personas', newPersona)
            .then(response => {
                console.log('Persona guardada exitosamente:', response.data); // Verificar la respuesta del backend
                setPersonas(personas => [...personas, response.data]); // Actualiza el estado con la nueva persona
                setNewName(''); // Limpiar el formulario
                setNewNumber('');
            })
            .catch(error => {
                console.error('Error al guardar la persona:', error.response ? error.response.data : error.message); // Mostrar más información sobre el error
                setErrorMessage('Error al guardar la persona');
            });
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

        setFilteredPersonas(resultado);
        setSearchName(''); // Limpiar búsqueda
    };

    const eliminarPersonas = () => {
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar todas las personas?');
        
        if (confirmacion) {
            // Iterar sobre todas las personas y eliminarlas por su ID
            const promesas = personas.map(persona => 
                axios.delete(`http://localhost:3002/personas/${persona.id}`)
            );
    
            // Esperar a que todas las eliminaciones se completen
            Promise.all(promesas)
                .then(() => {
                    setPersonas([]); // Vaciar todas las personas en el frontend
                    setFilteredPersonas([]); // Vaciar también los resultados de búsqueda
                    setNewName(''); // Limpiar el formulario
                    setNewNumber('');
                    setSearchName(''); // Limpiar el campo de búsqueda
                    setErrorMessage('');
                    alert('Todas las personas han sido eliminadas exitosamente');
                })
                .catch(error => {
                    console.error('Error al eliminar las personas:', error);
                    setErrorMessage('Error al eliminar las personas');
                });
        } else {
            alert('Eliminación cancelada');
        }
    };
    
    
    


    const eliminarNumero = (id, nombre) => {
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`);
        
        if (confirmacion) {
            axios.delete(`http://localhost:3002/personas/${id}`)
                .then(() => {
                    setPersonas(personas.filter(persona => persona.id !== id)); // Eliminar del estado
                    alert(`Persona eliminada exitosamente: ${nombre}`); // Usar plantillas literales
                    console.log(`Persona eliminada: ${nombre}`); // Usar plantillas literales
                })
                .catch(error => {
                    console.error('Error al eliminar la persona:', error);
                    setErrorMessage('Error al eliminar la persona');
                });
        } else {
            alert('Eliminación cancelada');
        }
    };
    



    const vaciarBusqueda = () => {
        setSearchName(''); // Limpiar el campo de búsqueda
    };

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
                    <button type="button" onClick={eliminarPersonas}>Eliminar Todos</button>
                </div>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Mostrar todas las personas */}
            <h2>Números</h2>
            <ul>
                {personas.map(persona => (
                    <li key={persona.id}>
                        Nombre: {persona.nombre} - Teléfono: {persona.telefono}
                        <button type="button" onClick={() => eliminarNumero(persona.id, persona.nombre)}>Eliminar</button>                    </li>
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
};

export default Agenda;
