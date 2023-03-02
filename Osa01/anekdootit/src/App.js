import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const mostVotesIndex = points.indexOf(Math.max(...points));


  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  function handleVote() {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={() => handleVote(selected)}>vote</button>
        <button onClick={handleClick}>next anacdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {points[mostVotesIndex]} votes</p>
    
    </div>
  );
};

export default App;
