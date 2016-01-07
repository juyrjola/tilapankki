import React from 'react';
import { Route } from 'react-router';

import AboutPage from 'containers/AboutPage';
import App from 'containers/App';
import HomePage from 'containers/HomePage';
import UserReservationsPage from 'containers/UserReservationsPage';
import NotFoundPage from 'containers/NotFoundPage';
import ReservationPage from 'containers/ReservationPage';
import ResourcePage from 'containers/ResourcePage';
import SearchPage from 'containers/SearchPage';
import VicinityApp from 'containers/VicinityApp';
import VicinityReservationPage from 'containers/VicinityReservationPage';
import HelloPage from 'containers/Hello';
import ResourcesList from 'containers/ResourcesList';
import fetchUserFromSession from 'actions/sessionActions';

import loginWithCallback from 'utils/LoginUtils';

export default (store) => {
  function removeFacebookAppendedHash(nextState, replaceState, cb) {
    if (window.location.hash && window.location.hash.indexOf('_=_') !== -1) {
      replaceState(null, window.location.hash.replace('_=_', ''));
    }
    cb();
  }

  function requireAuth(nextState, replaceState, dispatchRoute) {
    const { auth } = store.getState();
    if (!auth.userId) {
      loginWithCallback(() => {
        store.dispatch(fetchUserFromSession())
          .then(() => {dispatchRoute();});
      });
    } else {
      dispatchRoute();
    }
  }

  function scrollTop(nextState, replaceState, cb) {
    window.scrollTo(0, 0);
    cb();
  }

  return (
    <Route component={VicinityApp}>
      <Route onEnter={requireAuth}>
        <Route component={UserReservationsPage} path="/my-reservations" />
      </Route>
      <Route component={ResourcesList} onEnter={scrollTop} path="/" />
      <Route component={AboutPage} onEnter={scrollTop} path="/about" />
      <Route component={VicinityReservationPage} onEnter={scrollTop} path="/resources/:id" />
      <Route component={ReservationPage} path="/resources/:id/reservation" />
      <Route component={SearchPage} path="/search" />
      <Route component={NotFoundPage} path="*" />
    </Route>
  );
};
