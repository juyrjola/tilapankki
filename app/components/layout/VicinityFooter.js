import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import { FEEDBACK_URL } from 'constants/AppConstants';

import logoSrc from 'assets/images/helsinki-coat-of-arms-white.png';

class Footer extends Component {
  handleFeedbackClick(event) {
    event.preventDefault();
    const refUrl = window.location.href;
    window.location = `${FEEDBACK_URL}?ref=${refUrl}`;
  }

  render() {
    return (
      <footer>
        <Grid>
          <Row>
            <Col lg={3} md={3}>
              <Link className="brand-link" to="/">
              <img
                alt="Helsingin vaakuna"
                src={logoSrc}
              />
              Stadin tilapankki
              </Link>
            </Col>
          <Col lg={6} md={6}>
            <p>
              Stadin tilapankki on Digitaalisen Helsingin Tilat jakoon -työryhmän
              konseptiprototyyppi.
            </p>
          </Col>
        </Row>
      </Grid>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default Footer;
