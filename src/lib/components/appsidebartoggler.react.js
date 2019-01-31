import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sidebarCssClasses, validBreakpoints, checkBreakpoint } from './_shared/index';
import toggleClasses from './_shared/toggle-classes';

const propTypes = {
  /**
   * The children, defaults to  `<span className="navbar-toggler-icon" />`.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appsidebartoggler`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `navbar-toggler`.
   */
  className: PropTypes.string,

  /**
   * The display bootstrap class, defaults to `lg`.
   */
  display: PropTypes.any,

  /**
   * The mobile mode flag, default to `false`.
   */
  mobile: PropTypes.bool,

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
  id: 'appsidebartoggler',
  display: 'lg',
  mobile: false,
  tag: 'button',
  type: 'button'
};

/**
 * CoreUI sidebar toggler component.
 */
class appsidebartoggler extends Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = this.sidebarToggle.bind(this);
  }

  sidebarToggle(e) {
    e.preventDefault();
    this.toggle();
    // TODO HACK: Create a synthetic window resize event to cause Plotly graphs to re-render after the transition finishes.
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
  }

  toggle(force) {
    const [display, mobile] = [this.props.display, this.props.mobile]
    let cssClass = sidebarCssClasses[0]
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = `sidebar-${display}-show`
    }
    toggleClasses(cssClass, sidebarCssClasses, force)
  }

  render() {
    const { id, className, children, tag: Tag, ...attributes } = this.props;

    delete attributes.mobile
    delete attributes.display

    const classes = classNames(className, 'navbar-toggler');

    return (
      <Tag type="button" id={id} className={classes} {...attributes} onClick={(event)=>this.sidebarToggle(event)} data-sidebar-toggler>
        {children || <span className="navbar-toggler-icon" />}
      </Tag>
    );
  }
}

appsidebartoggler.propTypes = propTypes;
appsidebartoggler.defaultProps = defaultProps;

export default appsidebartoggler;
