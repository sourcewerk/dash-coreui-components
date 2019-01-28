import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,
  
  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appsidebarheader`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `sidebar-header`.
   */
  className: PropTypes.string,

  /**
   * The HTML tag, defaults to `div`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appsidebarheader',
  tag: 'div'
};

/**
 * CoreUI sidebar header component.
 */
class appsidebarheader extends Component {
  render() {
    const { id, className, children, tag: Tag, ...attributes } = this.props;
    const classes = classNames(className, 'sidebar-header');
    const header = children ? 
      <Tag id={id} className={classes} {...attributes} >
        {children}
      </Tag>
     : null;

    return (
      header
    );
  }
}

appsidebarheader.propTypes = propTypes;
appsidebarheader.defaultProps = defaultProps;

export default appsidebarheader;
