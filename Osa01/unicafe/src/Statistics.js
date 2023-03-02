import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={`${(good / all) * 100}%`} />
      </div>
    );
  }
};

export default Statistics;
