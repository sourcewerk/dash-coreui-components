import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from './_shared/index';
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
   * The default open flag, defaults to `false`.
   */
  defaultOpen: PropTypes.bool,

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
  id: 'appasidetoggler',
  defaultOpen: false,
  display: 'lg',
  mobile: false,
  tag: 'button',
  type: 'button'
};

/**
 * CoreUI aside toggler component.
 */
class appasidetoggler extends Component {
  constructor(props) {
    super(props);
    this.asideToggle = this.asideToggle.bind(this);

    this.state = {};
  }

  componentDidMount() {
    this.toggle(this.props.defaultOpen)
  }

  toggle(force) {
    const [display, mobile] = [this.props.display, this.props.mobile];
    let cssClass = asideMenuCssClasses[0];
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = `aside-menu-${display}-show`
    }
    toggleClasses(cssClass, asideMenuCssClasses, force)
  }

  asideToggle(e) {
    e.preventDefault();
    this.toggle()
    // TODO HACK: Create a synthetic window resize event to cause Plotly graphs to re-render after the transition finishes.
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
  }

  render() {
    const { id, className, children, type, tag: Tag, ...attributes } = this.props;

    delete attributes.defaultOpen;
    delete attributes.display;
    delete attributes.mobile;

    const classes = classNames(className, 'navbar-toggler');

    return (
      <Tag
          type={type}
          id={id}
          className={classes}
          {...attributes}
          onClick={(event)=>this.asideToggle(event)}
      >
        {children || <span className="navbar-toggler-icon" />}
      </Tag>
    );
  }
}

appasidetoggler.propTypes = propTypes;
appasidetoggler.defaultProps = defaultProps;

export default appasidetoggler;
