const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    return response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        return response.json(person)
    }
    return response.status(404).send("Not found")
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).send({ error: "Missing name/ number" })
    }
    if (persons.some(p => p.name === body.name)) {
        return response.status(400).send({ error: 'name must be unique' })
    }
    const id = Math.floor(Math.random() * 10000)
    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get('/info', (request, response) => {
    return response.send(
        `<div>Phonebook has info for ${persons.length} people.</div>
        <div>${new Date().toString()}</div>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        persons.filter(p => p.id !== id)
        response.status(204).end()
    }
    return response.status(404).send({ error: "Person not found" })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})