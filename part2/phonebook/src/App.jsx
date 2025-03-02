import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PhonebookService from "./services/PhonebookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    PhonebookService.getAll().then((response) => {
      setPersons(response);
    }).catch(error => {
      updateNotification(error.response.data.error, true)
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

  const updateNotification = (message, isError) => {
    setNotification({
      message: message,
      isError: isError,
    });
    setTimeout(() => {
      setNotification({});
    }, 3000);
  };

  const deleteEntry = (id) => {
    PhonebookService.remove(id)
      .then((response) => {
        const person = persons.find((person) => person.id === id);
        setNotification({
          message: `Deleted user ${person.name}`,
          isError: false,
        });
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
       updateNotification(error.response.data.error, true)
      });
  };

  const addEntry = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      console.log("not new name or number");

      updateNotification(
        `Failed to add ${newName} ${newNumber} as information was missing`,
        true
      );
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        PhonebookService.update(existingPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            );
            updateNotification(
              `${existingPerson.name}'s number was updated`,
              false
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log("error", error);
            updateNotification(
              error.response.data.error,
              true
            );
          });
      }
    } else {
      PhonebookService.create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          updateNotification(`Added ${newName}`, false);
        })
        .catch((error) => {
          updateNotification(error.response.data.error, true);
          setPersons(persons.concat(newPerson));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addEntry}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons entries={persons} filter={filter} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
