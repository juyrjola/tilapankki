import { createSelector } from 'reselect';

import ActionTypes from 'constants/ActionTypes';
import requestIsActiveSelectorFactory from 'selectors/factories/requestIsActiveSelectorFactory';

import isLoggedInSelector from 'selectors/isLoggedInSelector';

const userIdSelector = (state) => state.auth.userId;
const usersSelector = (state) => state.data.users;
const geolocationStatusSelector = (state) => state.geolocation.status;

const appSelector = createSelector(
  geolocationStatusSelector,
  isLoggedInSelector,
  userIdSelector,
  usersSelector,
  (
    geolocationStatus,
    isLoggedIn,
    userId,
    users
  ) => {
    const user = users[userId] || {};

    return {
      geolocationStatus,
      isLoggedIn,
      user,
    };
  }
);

export default appSelector;
