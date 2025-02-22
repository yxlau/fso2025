import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PhonebookService from "./services/PhonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    PhonebookService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const deleteEntry = (id) => {
    PhonebookService.remove(id).catch((error) => {
      alert(error);
    });
    setPersons(persons.filter((person) => person.id !== id));
  };

  const addEntry = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (
      existingPerson &&
      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      PhonebookService.update(existingPerson.id, newPerson).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? response : person
          )
        );
      });
    } else {
      PhonebookService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addEntry}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <Persons entries={persons} filter={filter} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
