
/*
Minimal app starter forked from App.js
*/

import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import appSelector from 'selectors/containers/appSelector';

export class UnconnectedApp extends Component {
    render() {
        const {
            actions,
            children,
            isLoggedIn,
            user,
            } = this.props;

        return (
            <DocumentTitle title="Tilapankki">
                <div className="app">
                    <div className="app-content">
                        <Grid>
                            {children}
                        </Grid>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const actionCreators = {
        updatePath
    };

    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(appSelector, mapDispatchToProps)(UnconnectedApp);
