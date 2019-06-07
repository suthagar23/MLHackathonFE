import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  render() {
    const { fill, simple, pullRight, round, block, onClick, ...rest } = this.props;

    const btnClasses = cx({
      'btn-fill': fill,
      'btn-simple': simple,
      'pull-right': pullRight,
      'btn-block': block,
      'btn-round': round
    });

    return <Button className={btnClasses} {...rest} style={{ minWidth:'130px', marginBottom: '10px'}} onClick={onClick}/>;
  }
}

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool,
  onClick: PropTypes.func
};

export default CustomButton;
