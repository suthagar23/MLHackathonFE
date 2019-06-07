import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import HeaderLinks, { LoginLinks} from './headerLinks.jsx';
import PropTypes from 'prop-types';
import dashboardRoutes from '../../routes/dashboard.jsx';

const mapStateToProps = (state, ownProps) => {
  return {   };
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPageTitle() {
    var name;
    dashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  render() {

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            Food and Features
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  auth: PropTypes.object.isRequired,
  auth: PropTypes.shape({
    logedIn: PropTypes.bool.isRequired
  })
};
// export default Header;
const HeaderComponent = connect(mapStateToProps)(Header);
export default HeaderComponent;
