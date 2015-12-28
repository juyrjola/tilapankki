
/*
Minimal component container forked from AboutPage.js
*/

import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

import { FEEDBACK_URL } from 'constants/AppConstants';

class HelloPage extends Component {

  render() {
    return <div>Hello!</div>;
  }
}

HelloPage.propTypes = {};

export default HelloPage;
