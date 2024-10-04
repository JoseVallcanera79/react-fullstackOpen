import express from 'express'
const app = express()
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id); // Convierte a número
  console.log('Buscando nota con ID:', id); // Añade este log
  const note = notes.find(note => note.id === id); // Comparación corregida
  console.log('nota encontrada', note)
  if (note) {
    response.json(note);
  } else {
    response.status(404).send({ error: 'Note not found' });
  }
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  console.log('Nueva nota en la base de datos', body)

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  console.log('Nota eliminada', id)

  response.status(204).end()
})


const PORT = 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)