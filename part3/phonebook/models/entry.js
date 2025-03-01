const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(result => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.log('Error connecting to MongoDB:', error.message);
})

const entrySchema = new mongoose.Schema({
  number: String,
  name: String
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', entrySchema)