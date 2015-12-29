import Immutable from 'seamless-immutable';
import types from 'constants/ActionTypes';

const initialState = Immutable({
  status: 'initial',
  position: null,
  error: null,
});

export default function geolocationReducer(state = initialState, action) {
  switch (action.type) {
    case types.GEOLOCATION.REQUEST:
      return state.merge({
        status: 'requested',
      });
    case types.GEOLOCATION.DETECTED:
      return state.merge({
        status: 'detected',
        position: action.position,
      });
    case types.GEOLOCATION.ERROR:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state;
  }
}
