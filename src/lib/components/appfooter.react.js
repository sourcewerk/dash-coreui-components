import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appfooter`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `app-footer`.
   */
  className: PropTypes.string,

  /**
   * The fixed flag, defaults to `false`. 
   */
  fixed: PropTypes.bool,

  /**
   * The HTML tag, defaults to `footer`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appfooter',
  tag: 'footer',
  fixed: false
};

/**
 * CoreUI footer component.
 */
class appfooter extends Component {
  constructor(props) {
    super(props);

    this.isFixed = this.isFixed.bind(this);
  }

  componentDidMount() {
    this.isFixed(this.props.fixed);
  }

  isFixed(fixed) {
    if (fixed) { document.body.classList.add('footer-fixed'); }
  }

  render() {
    const { className, id, children, tag: Tag, ...attributes } = this.props;

    delete attributes.fixed

    const classes = classNames(className, 'app-footer');

    return (
      <Tag id={id} className={classes} {...attributes}>
        {children}
      </Tag>
    );
  }
}

appfooter.propTypes = propTypes;
appfooter.defaultProps = defaultProps;

export default appfooter;
