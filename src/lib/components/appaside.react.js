import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { asideMenuCssClasses, checkBreakpoint, validBreakpoints } from './_shared';
import toggleClasses from './_shared/toggle-classes';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appaside`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `aside-menu`.
   */
  className: PropTypes.string,

  /**
   * The display bootstrap class, defaults to `sm, md, lg, xl, ""`.
   */
  display: PropTypes.string,

  /**
   * The fixed flag, defaults to `false`. 
   */
  fixed: PropTypes.bool,

  /**
   * The is open flag, defaults to `false`.
   */
  isOpen: PropTypes.bool,

  /**
   * The off canvas flag, defaults to `true`.
   */
  offCanvas: PropTypes.bool,

  /**
   * The HTML tag, defaults to `aside`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  tag: 'aside',
  display: '',
  fixed: false,
  isOpen: false,
  offCanvas: true
};

class appaside extends Component {
  constructor(props) {
    super(props);

    this.isFixed = this.isFixed.bind(this);
    this.isOffCanvas = this.isOffCanvas.bind(this);
    this.displayBreakpoint = this.displayBreakpoint.bind(this);
  }

  componentDidMount() {
    this.isFixed(this.props.fixed);
    this.isOffCanvas(this.props.offCanvas);
    this.displayBreakpoint(this.props.display);
  }

  isFixed(fixed) {
    if (fixed) { document.body.classList.add('aside-menu-fixed'); }
  }

  isOffCanvas(offCanvas) {
    if (offCanvas) { document.body.classList.add('aside-menu-off-canvas'); }
  }

  displayBreakpoint(display) {
    if (display && checkBreakpoint(display, validBreakpoints)) {
      const cssClass = `aside-menu-${display}-show`
      toggleClasses(cssClass, asideMenuCssClasses, true)
    }
  }

  render() {
    const { className, children, tag: Tag, ...attributes } = this.props;

    delete attributes.display
    delete attributes.fixed
    delete attributes.offCanvas
    delete attributes.isOpen

    const classes = classNames(className, 'aside-menu');

    return (
      <Tag {...attributes} className={classes}>
        {children}
      </Tag>
    );
  }
}

appaside.propTypes = propTypes;
appaside.defaultProps = defaultProps;

export default appaside;
