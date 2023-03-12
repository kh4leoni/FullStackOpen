import { useState, useEffect } from "react";
import Search from "./components/Search";
import Form from "./components/Form";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')


  useEffect(() => {
    personService.getData().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const handleDelete = (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);

    if (isConfirmed) {

      personService
        .deletePerson(id)
        setMessageColor('red')
        console.log(messageColor)
        setMessage(`Deleted ${name}`)
        setTimeout(() => {
          setMessage(null)
        },5000)
     
      const filteredPersons = persons.filter((person) => person.id !== id);
      setPersons(filteredPersons);
    } else {
      return;
    }
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event, id) => {
    event.preventDefault();

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (replace) {
        const foundPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const updatedObject = { ...foundPerson, number: phoneNumber };
        console.log(updatedObject);
        id = foundPerson.id;

        personService
          .update(id, updatedObject)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
                
              )
              
            )
            
          ).catch(error => {
            setMessageColor('red')
            setMessage(`Informaton of ${foundPerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        
        setMessageColor('yellow')
        setMessage(`${foundPerson.name} Updated`)
        setTimeout(() => {
          setMessage(null)
        },5000)
        setNewName("");
        setPhoneNumber("");
      }
      return;
    }

    const personObject = {
      name: newName,
      number: phoneNumber,
    };

    personService.create(personObject).then((personFound) => {
      setPersons(persons.concat(personFound));
    });
    setMessageColor('green')
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setNewName("");
    setPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor}/>
      <Search search={search} handleSearch={handleSearch} />

      <h2>Add new</h2>

      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        phoneNumber={phoneNumber}
        handleNewName={handleNewName}
        handlePhoneNumber={handlePhoneNumber}
      />

      <h2>Numbers</h2>

      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Persons
            key={person.id}
            person={person}
            handleDelete={() => handleDelete(person.id, person.name)}
          />
        ))}
    </div>
  );
};

export default App;
