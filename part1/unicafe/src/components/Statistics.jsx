import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  const { good, bad, neutral, average, allClicks, positive } = props.props;

  if (allClicks < 1) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allClicks} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

export default Statistics;
