import {
  incrementBad,
  incrementGood,
  incrementOk,
  resetValues,
} from "../reducer";
import { useDispatch } from "react-redux";

const Buttons = () => {
  const dispatch = useDispatch();

  const good = () => {
    dispatch(incrementGood());
  };

  const bad = () => {
    dispatch(incrementBad());
  };

  const ok = () => {
    dispatch(incrementOk());
  };

  const reset = () => {
    dispatch(resetValues());
  };
  return (
    <div>
      <button onClick={good}>Good</button> <button onClick={ok}>ok</button>{" "}
      <button onClick={bad}>Bad</button> <button onClick={reset}>Reset</button>{" "}
    </div>
  );
};

export default Buttons;
