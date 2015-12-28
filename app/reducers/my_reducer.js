import Immutable from 'seamless-immutable';

import types from 'constants/ActionTypes';

const initialState = Immutable({
  reduced: {}
});

function handleData(state, data) {
  return state.merge(data, { deep: true });
}

function myReducer(state = initialState, action) {
  switch (action.type) {

    case types.RED.REDUCING:
      return handleData(state, action.payload.entities);

    default:
      return state;
  }
}

export default myReducer;
export { handleData };
