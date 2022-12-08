const Statistics = ({ children, allClicks }) => {
  if (allClicks.length < 1) {
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
      {children}
    </div>
  );
};

export default Statistics;
