import trim from 'lodash/string/trim';
import React, { Component, PropTypes } from 'react';
import {
  Navbar as RBNavbar,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import logoSrc from 'assets/images/helsinki-coat-of-arms-white.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RBNavbar inverse>
        <RBNavbar.Header>
          <RBNavbar.Brand>
            <Link to={'/'}>
              <img
                alt="Helsingin vaakuna"
                src={logoSrc}
              />
              Stadin tilapankki
            </Link>
          </RBNavbar.Brand>
        </RBNavbar.Header>
      </RBNavbar>
    );
  }
}

Navbar.propTypes = {
  clearSearchResults: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default Navbar;
