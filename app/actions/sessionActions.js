import { CALL_API } from 'redux-api-middleware';
import types from 'constants/ActionTypes';

export default function fetchUserFromSession() {
  const params = { t: +new Date() };
  return {
    [CALL_API]: {
      types: [types.SESSION.REQUEST, types.SESSION.SUCCESS, types.SESSION.FAILURE],
      endpoint: `/auth?t=${params.t}`,
      method: 'GET',
      credentials: 'include',
    },
  };
}
