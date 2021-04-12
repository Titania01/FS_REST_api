import express from 'express'
const app = express()

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-56-334578' },
  { id: 3, name: 'Dan Abramov', number: '12-34-890763' },
  { id: 4, name: 'Mary Poppendicek', number: '23-67-123456'}
]

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

app.listen(9090, () => {
    console.log('Server is running on port 9090')
})