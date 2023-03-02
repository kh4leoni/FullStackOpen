import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
    const updatedGood = good + 1
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    const updatedNeutral = neutral + 1
    setAll(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    const updatedBad = bad + 1
    setAll(good + neutral + updatedBad)
  }



  return (
      <div>
          <h1>give feedback</h1>
          <Button text="good" handleClick={handleGoodClick}/>
          <Button text="neutral" handleClick={handleNeutralClick}/>
          <Button text="bad" handleClick={handleBadClick} />
          <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
          

      </div>
  );
}


export default App;
