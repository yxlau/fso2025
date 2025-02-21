import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  
  const addEntry = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName
    }

    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry} >
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App