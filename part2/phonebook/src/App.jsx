import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

    const handleNumberChange = (e) => {
      setNewNumber(e.target.value);
    };

    const handleNameChange = (e) => {
      setNewName(e.target.value);
    };

  const addEntry = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addEntry} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} />
      <h2>Numbers</h2>
      <Persons entries={persons} filter={filter} />
    </div>
  );
};

export default App;
