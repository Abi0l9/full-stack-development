const Total = ({ total }) => {
  const all = total.map((each) => each.exercises).reduce((a, b) => a + b, 0);
  return (
    <div>
      <b>total of {all} exercises</b>
    </div>
  );
};

export default Total;
