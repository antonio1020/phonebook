const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

//Right at the beginning of our code we're importing express, 
//which this time is a function that is used to create an express application 
//stored in the app variable:

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  //this is the route get, for the address /
  // and you can see what it sends


  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  response.send( `<div>
    <p>Phonebook has info for ${persons.length} people</p></div> 
    <div> <p> ${currentDate} ${timeZone}</p>
</div>`)  

  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const newId = getRandomInt(1,10000)
    return newId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.body);
    const dupes = persons.filter((dupes) =>
  dupes.name === body.name
)
    console.log(dupes);
    if (!body.name || !body.number) 
    {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    else if (dupes.length!==0){
return response.status(400).json({ 
  error: 'duplicate name'
    })
  }
  console.log(body);
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })