

const Form = ({handleSubmit, handleNewName, newName, phoneNumber, handlePhoneNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
