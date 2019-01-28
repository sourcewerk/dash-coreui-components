import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appsidebarform`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `sidebar-form`.
   */
  className: PropTypes.string,

  /**
   * The HTML tag, defaults to `div`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appsidebarform',
  tag: 'div'
};

/**
 * CoreUI sidebar form component.
 */
class appsidebarform extends Component {
  render() {
    const { id, className, children, tag: Tag, ...attributes } = this.props;
    const classes = classNames(className, 'sidebar-form');
    const form = children ? 
      <Tag id={id} className={classes} {...attributes} >
        {children}
      </Tag>
     : null;

    return (
      form
    );
  }
}

appsidebarform.propTypes = propTypes;
appsidebarform.defaultProps = defaultProps;

export default appsidebarform;
