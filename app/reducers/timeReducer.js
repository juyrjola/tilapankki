import Immutable from 'seamless-immutable';
import types from 'constants/ActionTypes';

const initialState = Immutable({
  status: 'initial',
  time: null,
});

export default function timeReducer(state = initialState, action) {
  switch (action.type) {
    case types.TIME.UPDATE:
      return state.merge({
        status: 'updated',
        time: action.time.toISOString(),
       });
    default:
      return state;
  }
}
