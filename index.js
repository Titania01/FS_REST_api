import express from 'express'
const app = express()

let persons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-56-334578' },
  { name: 'Dan Abramov', number: '12-34-890763' },
  { name: 'Mary Poppendicek', number: '23-67-123456'}
]

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.listen(9090, () => {
    console.log('Server is running on port 9090')
})