import forEach from 'lodash/collection/forEach';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { Grid } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import { clearSearchResults } from 'actions/searchActions';
import { fetchGeolocation } from 'actions/geolocationActions';
import { updateTime } from 'actions/timeActions';
import { postPendingReservation } from 'actions/reservationActions';
import fetchUserFromSession from 'actions/sessionActions';
import Footer from 'components/layout/VicinityFooter';
import Navbar from 'components/layout/VicinityNavBar';
import Notifications from 'containers/Notifications';
import appSelector from 'selectors/containers/appSelector';

export class UnconnectedApp extends Component {
  componentDidMount() {
    const { actions, isLoggedIn } = this.props;
    this.props.actions.updateTime();
    this.props.actions.fetchGeolocation();
    this.props.actions.fetchUserFromSession();
  }

  render() {
    const {
      actions,
      children,
      isLoggedIn,
      geolocationStatus,
      user,
    } = this.props;

    return (
      <DocumentTitle title="Stadin tilapankki">
        <div className="app">
          <Navbar
            clearSearchResults={actions.clearSearchResults}
            isLoggedIn={isLoggedIn}
            user={user}
          />
          <Grid className="app-content">
              <Notifications />
              {geolocationStatus == "requested" ? (
                <p>Haetaan sijaintiasi...</p>
              ) : (<span />
              )}
              <Loader loaded={geolocationStatus == "detected"}>
                {children}
              </Loader>
          </Grid>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

UnconnectedApp.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool.isRequired,
  geolocationStatus: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    clearSearchResults,
    updateTime,
    fetchGeolocation,
    updatePath,
    postPendingReservation,
    fetchUserFromSession,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(appSelector, mapDispatchToProps)(UnconnectedApp);
