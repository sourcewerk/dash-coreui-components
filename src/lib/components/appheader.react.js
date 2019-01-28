import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The children. 
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appheader`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name.
   */
  className: PropTypes.string,

  /**
   * Wether the header is fixed, defaults to `false`.
   */
  fixed: PropTypes.bool,

  /**
   * The HTML tag, defaults to `header`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appheader',
  tag: 'header',
  fixed: false
};

/**
 * CoreUI header component.
 */
class appheader extends Component {
  componentDidMount() {
    this.isFixed(this.props.fixed);
  }

  isFixed(fixed) {
    if (fixed) { document.body.classList.add('header-fixed'); }
  }

  // breakpoint(breakpoint) {
  //   return breakpoint || '';
  // }

  render() {
    const { id, className, children, tag: Tag, ...attributes } = this.props;

    delete attributes.fixed

    const classes = classNames(className, 'app-header', 'navbar');

    return (
      <Tag id={id} className={classes} {...attributes}>
        {children}
      </Tag>
    );
  }
}

appheader.propTypes = propTypes;
appheader.defaultProps = defaultProps;

export default appheader;
