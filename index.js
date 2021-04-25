import express from 'express'
import morgan from 'morgan'
const app = express()

const cors = require('cors')

app.use(cors())

app.disable('x-powered-by')
app.use(express.json())

morgan.token('data', function (req, res) { return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-56-334578' },
  { id: 3, name: 'Dan Abramov', number: '12-34-890763' },
  { id: 4, name: 'Mary Poppendicek', number: '23-67-123456'}
]

// const generateId = (length=4) => Math.random().toString(36).substring(2,2+length)
const generateId = () => persons.length? Math.max(...persons.map(person => person.id)) + 1 : 1

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p> 
  <h4>${new Date()}</h4>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  res.json(person)

  if (person) {
    res.json(person)
  }else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons',(req,res) => {
  const {name , number} = req.body
  if(!name || !number) return res.status(400).json({error:"name/number must be supplied!"})
  const personExist = persons.some(person => person.name.toLowerCase()===name.toLowerCase())
  if(personExist) return res.status(409).json({error:"name must be unique"})
  const newPerson = {
    id:generateId(),
    name,
    number
  }
  
  persons = persons.concat(newPerson)
  return res.json(newPerson)

})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})