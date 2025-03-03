require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

app.use(express.static('dist'))
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


app.get('/api/persons', (request, response) => {
  Entry.find().then(person => {
    response.json(person)
  }).catch(error => {
    response.status(500).json({ error: error.message })
  })
})

app.get('/api/persons/:id', (request, response) => {
  Entry.findById(request.params.id).then(entry => {
    if (entry) {
      response.json(entry)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    response.status(400).json({ error: error.message })
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const entry = new Entry({
    name: body.name,
    number: body.number,
  })

  entry.save().then(savedEntry => {
    response.json(savedEntry)
  }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Entry.find().then(entries => {
    response.send(
      `<div>Phonebook has info for ${entries.length} people.</div>
        <div>${new Date().toString()}</div>`

    )
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(response => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const entry = {
    name: body.name,
    number: body.number
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true, runValidators: true, context: 'query' })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})