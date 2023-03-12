

const Persons = ({person, handleDelete}) => {
    return (
        
        <li>
            {person.name} {person.number}
          <button onClick={handleDelete}>delete</button>
          </li>
        
    );
}

export default Persons;
