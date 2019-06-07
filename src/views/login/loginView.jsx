import React, { Component } from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert, Dropdown, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import Container from '../../components/container/container.jsx'; 
import Button from '../../components/customButton/customButton.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGet, fetchPost } from '../../utils/restMethods';

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateUserLoginForm: userLoginData => dispatch(validateUserLoginForm(userLoginData))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, {
    redux: {
      state: stateProps,
      actions: dispatchProps
    }
  });
};


class Login extends Component {
  constructor() {
    super();
    this.state = {
      rows: [
        {
          productId: 0,
          featureId: 0
        }
      ],
      products: [],
      reviews: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.removeClicked = this.removeClicked.bind(this);
    this.addMoreClicked = this.addMoreClicked.bind(this);
  }
  
  componentWillMount() {  
    fetchGet('/products').then(productData => {
      var dataArray = []
      for (let item of productData) {
        dataArray.push(item.name)
      }
      this.setState(Object.assign({}, this.state, { products: dataArray }))

         
      fetchGet('/reviews').then(reviewData => {
        var dataArray = reviewData.fileList
        this.setState(Object.assign({}, this.state, { reviews: dataArray }))
        console.log(this.state)
      })
      .catch(err => {
        console.log("Fetch /products error. " + err)
      })

      console.log(this.state)

    })
    .catch(err => {
      console.log("Fetch /products error. " + err)
    })

  }
 
  handleChange(event) {
   
  }

  ChangeValidatorStates(isUserNameCorrect, isPasswordCorrect){

  }

  submitForm(e) {
    console.log(e)
    e.preventDefault();
    var emailAddress = document.getElementById('userEmail').value
    if (!emailAddress) {
      console.log(true)
      this.setState(Object.assign({}, this.state, { emailError: true }))
    } else {
      this.setState(Object.assign({}, this.state, { emailError: false }))

      const postData = {
        emailAddress,
        info: this.state.rows
      }

      fetchPost('/reviews', postData).then(res => {
        console.log("POST /reviews success")

        this.setState(Object.assign({}, this.state, { isPosted: true }))

      })
      .catch(err => {
        console.error("POST /reviews error", err);
      })
    }
  }
  

  removeClicked(rowIndex) {
    console.log(rowIndex)
    var currentRows = this.state.rows;
    currentRows.splice(rowIndex, 1);
    this.setState(Object.assign({}, this.state, { rows: currentRows }));
    console.log(this.state)
  }

  addMoreClicked() {
    const row = {
      productId: 0,
      featureId: 0
    }
    this.setState(prevState => (
      Object.assign({}, this.state, { rows: [...prevState.rows,row] })
    ))
    console.log(this.state)
  }

  addProductInfoToRow(rowId) {
    var rowIndex = rowId.replace("productItems",'')
    var element = document.getElementById(rowId)
    var selectedIndex = element.selectedIndex

    const rowItems = [...this.state.rows];
    rowItems[rowIndex].productId = selectedIndex;
    this.setState(Object.assign({}, this.state, { rows: rowItems }));
    console.log(this.state)
  }

  addFeatureInfoToRow(rowId) {
    var rowIndex = rowId.replace("featureItems",'')
    var element = document.getElementById(rowId)
    var selectedIndex = element.selectedIndex

    const rowItems = [...this.state.rows];
    rowItems[rowIndex].featureId = selectedIndex;
    this.setState(Object.assign({}, this.state, { rows: rowItems }));
    console.log(this.state)
  }

  getProductRows() {
    let rows = []
    let rowIndex = 0;
    console.log(this.state.rows)
    for(let row of this.state.rows) {
        rows.push(
        <Row key={rowIndex}>
          <Col md={5}>
              <FormGroup controlId={"productItems" + rowIndex} >
                <ControlLabel>Products</ControlLabel>
                < FormControl componentClass="select" placeholder="select" onClick={(e) => {
                  e.preventDefault()
                  this.addProductInfoToRow(e.target.id)
                  }}>

                  {this.state.products.map((item,index) => {
                    return <option value={index} key={index}>{item}</option>
                  })}

                </FormControl>               
              </FormGroup>   
            </Col>
            <Col md={5}>
              <FormGroup controlId={"featureItems" + rowIndex}>
                <ControlLabel>Reviews</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onClick={(e) => {
                  e.preventDefault()
                  this.addFeatureInfoToRow(e.target.id)
                  }}>

                    {this.state.reviews.map((item,index) => {
                    return <option value={index} key={index}>{item}</option>
                  })}

                </FormControl>               
              </FormGroup>   
            </Col>
            <Col md={1}>
              <FormGroup controlId="userName">
                <ControlLabel> . </ControlLabel>
                <Button bsStyle="danger" id={rowIndex} fill onClick={(e) => {
                  e.preventDefault()
                  this.removeClicked(e.target.id)}} >
                  - Remove
                </Button>              
              </FormGroup>
            </Col>
          </Row>
          )
          rowIndex +=1
    }
    return rows
  }

  render() {
    const loginCardStyle = {
      float: 'none',
      margin: '0 auto'
    };
    
    const showAlerts = (alertTyle, message) => {
      return (<Alert bsStyle={alertTyle}> { message }</Alert>);
    };

    const ShowEmailAddressAlert = () => {
      var status = this.state.emailError || false
      if (status) {
        return showAlerts('danger', 'Invalid emailAddress, please check it');
      }
      return null;
    };

    const ShowDataPosted = () => {
      var status = this.state.isPosted || false
      if (status) {
        return showAlerts('success', 'Successfully submitted. Please check your email to get the results');
      }
      return null;
    };

    return (
      <div className="content">
        <Grid fluid>
        

          <Row>
            <Col md={12} style={loginCardStyle}>
              <Container
                title="Feature Selection"
                content={
                  <form className="form" onSubmit={ (e) => this.submitForm(e) }>
                    
                    <ShowDataPosted />

                    {this.state.products.length != 0 &&  this.getProductRows()}

                    <Button bsStyle="success" fill pullRight  onClick={() => this.addMoreClicked()}>
                      + Add
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} style={loginCardStyle}>
              <Container
                title=""
                content={
                  <form className="form" onSubmit={ (e) => this.submitForm(e) }>
                     
                    <ShowEmailAddressAlert />

                    <FormGroup controlId="userEmail">
                      <ControlLabel>Email address to recive the report</ControlLabel>
                      <FormControl
                        type="text"
                        name="userEmail"
                        value={this.state.value}
                        placeholder="Enter your email"
                        onChange={this.handleChange}
                      />                
                    </FormGroup>
                
                    <Button bsStyle="info" fill pullRight type="submit">
                      Process
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    actions: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      validateUserLoginForm:  PropTypes.func.isRequired,
    }),
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      auth: PropTypes.object.isRequired,
      auth: PropTypes.shape({
        logedIn: PropTypes.bool.isRequired
      })
    })
  }),
  history : PropTypes.object.isRequired,
};

const LoginComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(Login);
export default LoginComponent;
