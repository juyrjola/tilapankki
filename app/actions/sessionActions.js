import { CALL_API } from 'redux-api-middleware';

export default function fetchUserFromSession() {
  const params = { t: +new Date() };
  return {
    [CALL_API]: {
      types: ['SESSION.REQUEST', 'SESSION.SUCCESS', 'SESSION.FAILURE'],
      endpoint: `/auth?t=${params.t}`,
      method: 'GET',
      credentials: 'include',
    },
  };
}
