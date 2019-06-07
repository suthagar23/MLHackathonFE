import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';  
import PropTypes from 'prop-types';

const mapStateToProps = (state, ownProps) => {
  return {auth: state.auth, };
};


class HeaderLinks extends Component {
  constructor(props) {
    super(props); 
    this.handleNewSalesClick = this.handleNewSalesClick.bind(this);
  }

  handleNewSalesClick(){

  }

  handleLogOut() {
    DeleteAuthCookie();
  }

  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#/orderlist">Active Orders</NavItem>
        </Nav>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const HeaderLinksComponetn = connect(mapStateToProps)(HeaderLinks);
export default HeaderLinksComponetn;


export class LoginLinks extends Component {
  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#/auth">
            Dashboard
          </NavItem>
        </Nav>
      </div>
    );
  }
}

