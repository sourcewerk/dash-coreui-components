import React, { Component } from 'react';
import { Dropdown } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The children. 
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appheaderdropdown`.
   */
  id: PropTypes.string,

  /**
   * The dropdown direction, defaults to `down`.
   */
  direction: PropTypes.string
};

const defaultProps = {
  id: 'appheaderdropdown',
  direction: 'down'
};

/**
 * CoreUI header dropdown menu component.
 */
class appheaderdropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { children, id, ...attributes } = this.props;
    return (
      <Dropdown id={id} nav isOpen={this.state.dropdownOpen} toggle={this.toggle} {...attributes}>
        {children}
      </Dropdown>
    );
  }
}

appheaderdropdown.propTypes = propTypes;
appheaderdropdown.defaultProps = defaultProps;

export default appheaderdropdown;
