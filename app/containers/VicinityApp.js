import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import { clearSearchResults } from 'actions/searchActions';
import { fetchGeolocation } from 'actions/geolocationActions';
import Footer from 'components/layout/VicinityFooter';
import Navbar from 'components/layout/VicinityNavBar';
import Notifications from 'containers/Notifications';
import appSelector from 'selectors/containers/appSelector';

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.actions.fetchGeolocation();
  }

  render() {
    const {
      actions,
      children,
      isLoggedIn,
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
          <div className="app-content">
            <Grid>
              <Notifications />
              {children}
            </Grid>
          </div>
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
  user: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    clearSearchResults,
    fetchGeolocation,
    updatePath,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(appSelector, mapDispatchToProps)(UnconnectedApp);
