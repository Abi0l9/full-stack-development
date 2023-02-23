const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      let good = state.good;
      good++;
      const newGoodState = { ...state, good: good };
      return newGoodState;
    case "OK":
      let ok = state.ok;
      ok++;
      const newOkState = { ...state, ok: ok };
      return newOkState;
    case "BAD":
      let bad = state.bad;
      bad++;
      const newBadState = { ...state, bad: bad };
      return newBadState;
    case "ZERO":
      const newState = { ...state, good: 0, bad: 0, ok: 0 };
      return newState;
  }

  return state;
};

export default counterReducer;
