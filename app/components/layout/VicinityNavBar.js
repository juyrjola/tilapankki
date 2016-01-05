import trim from 'lodash/string/trim';
import React, { Component, PropTypes } from 'react';
import {
  Glyphicon,
  MenuItem,
  Navbar as RBNavbar,
  Nav,
  NavDropdown,
  NavItem,
} from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import { getSearchPageUrl } from 'utils/SearchUtils';

import logoSrc from 'assets/images/helsinki-coat-of-arms-white.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.renderUserNav = this.renderUserNav.bind(this);
  }

  renderUserNav() {
    const { isLoggedIn, user } = this.props;
    let name;
    if (user.firstName || user.lastName) {
      name = trim([user.firstName, user.lastName].join(' '));
    } else {
      name = user.emails && user.emails.length ? user.emails[0].value : '';
    }

    if (isLoggedIn) {
      return (
        <NavDropdown id="collapsible-navbar-dropdown" title={name}>
          <LinkContainer to="/my-reservations">
            <MenuItem>Omat varaukset</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <MenuItem href={`/logout?next=${window.location.origin}`}>
            Kirjaudu ulos
          </MenuItem>
        </NavDropdown>
      );
    }

    return (
      <NavItem href="/login/helsinki/initiate/">Kirjaudu sisään</NavItem>
    );
  }

  render() {
    const { clearSearchResults } = this.props;

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
          <RBNavbar.Toggle />
        </RBNavbar.Header>
        <RBNavbar.Collapse>
          <Nav navbar pullRight>
            {this.renderUserNav()}
          </Nav>
        </RBNavbar.Collapse>
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
