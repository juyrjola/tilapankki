// import { createAction } from 'redux-actions';
import types from 'constants/ActionTypes';
import moment from 'moment';

export function updateTime() {
  return {
    type: types.TIME.UPDATE,
    time: moment(),
  };
}
