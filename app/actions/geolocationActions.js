// import { createAction } from 'redux-actions';
import types from 'constants/ActionTypes';
import { addNotification, hideNotification } from 'actions/notificationsActions';

export function requestGeolocation() {
  return {
    type: types.GEOLOCATION.REQUEST,
  };
}

export function geolocationDetected(position) {
  return {
    type: types.GEOLOCATION.DETECTED,
    position: {
      timestamp: position.timestamp,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      },
    },
  };
}

export function geolocationError(error) {
  return {
    type: types.GEOLOCATION.ERROR,
    error: { code: error.code, message: error.message },
  };
}

export function fetchGeolocation() {
  return dispatch => {
    dispatch(requestGeolocation());
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(geolocationDetected(position));
      },
      (error) => {
        dispatch(geolocationError(error));
      }
    );
  };
}
