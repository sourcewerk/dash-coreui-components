import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appsidebarminimizer`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `sidebar-minimizer mt-auto`.
   */
  className: PropTypes.string,

  /**
   * The HTML tag, defaults to `button`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /**
   * The HTML type, defauls to `button`. 
   */
  type: PropTypes.string
};

const defaultProps = {
  id: 'appsidebarminimizer',
  tag: 'button',
  type: 'button'
};

/**
 * CoreUI sidebar minimizer component.
 */
class appsidebarminimizer extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const isMinimized = document.body.classList.contains('sidebar-minimized');
    this.togglePs(!isMinimized)
  }

  sidebarMinimize() {
    const isMinimized = document.body.classList.toggle('sidebar-minimized');
    this.togglePs(!isMinimized)
  }

  togglePs(toggle) {
    const sidebar = document.querySelector('.sidebar-nav')
    if (sidebar) {
      if (toggle) {
        sidebar.classList.add('ps', 'ps-container', 'ps--active-y')
      } else {
        sidebar.classList.remove('ps', 'ps-container', 'ps--active-y')
      }
    }

  }

  brandMinimize() {
    document.body.classList.toggle('brand-minimized');
  }

  handleClick(e) {
    this.sidebarMinimize(e)
    this.brandMinimize(e)
  }

  render() {
    const { id, className, children, tag: Tag, type, ...attributes } = this.props;

    const classes = classNames(className, 'sidebar-minimizer', 'mt-auto');

    return (
      <Tag id={id} className={classes} type={type} {...attributes} onClick={(event)=>this.handleClick(event)} >
        {children}
      </Tag>
    );
  }
}

appsidebarminimizer.propTypes = propTypes;
appsidebarminimizer.defaultProps = defaultProps;

export default appsidebarminimizer;
