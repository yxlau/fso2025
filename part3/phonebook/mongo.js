const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please provide a password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fso2025:${password}@cluster0.d1nv0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  number: String,
  name: String
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
  console.log("phonebook:");
  
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry.name, entry.number);
    })
    mongoose.connection.close()
  })
} else {
  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4]
  })

  entry.save().then(result => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`);
    mongoose.connection.close()
  })
}






