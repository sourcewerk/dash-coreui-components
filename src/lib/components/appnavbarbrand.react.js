import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * The HTML tag, defaults to `a`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /**
   * The children, defaults to `<img src width height alt className/>`.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appnavbarbrand`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `navbar-brand`.
   */
  className: PropTypes.string,

  /**
   * The brand image, given as `{src, width, height, alt, className: 'navbar-brand' }`.
   */
  brand: PropTypes.any,

  /**
   * The full size brand image, given as `{src, width, height, alt, className: 'navbar-brand-full' }`.
   */
  full: PropTypes.any,

  /**
   * The minimized brand image, given as `{src, width, height, alt, className: 'navbar-brand-minimized' }`.
   */
  minimized: PropTypes.any
};

const defaultProps = {
  id: 'appnavbarbrand',
  tag: 'a'
};

/**
 * CoreUI navbar brand component.
 */
class appnavbarbrand extends Component {
  imgSrc(brand) {
    return brand.src ? brand.src : '';
  }

  imgWidth(brand) {
    return brand.width ? brand.width : 'auto';
  }

  imgHeight(brand) {
    return brand.height ? brand.height : 'auto';
  }

  imgAlt(brand) {
    return brand.alt ? brand.alt : '';
  }

  navbarBrandImg(props, classBrand, key) {
    return (
      <img
          src={this.imgSrc(props)}
          width={this.imgWidth(props)}
          height={this.imgHeight(props)}
          alt={this.imgAlt(props)}
          className={classBrand}
          key={key.toString()}
      />
    );
  }

  render() {
    const { id, className, children, tag: Tag, ...attributes } = this.props;
    const classes = classNames(className, 'navbar-brand');

    const img = [];
    if (this.props.brand) {
      const props = this.props.brand;
      const classBrand = 'navbar-brand';
      img.push(this.navbarBrandImg(props, classBrand, img.length + 1));
    }
    if (this.props.full) {
      const props = this.props.full;
      const classBrand = 'navbar-brand-full';
      img.push(this.navbarBrandImg(props, classBrand, img.length + 1));
    }
    if (this.props.minimized) {
      const props = this.props.minimized;
      const classBrand = 'navbar-brand-minimized';
      img.push(this.navbarBrandImg(props, classBrand, img.length + 1));
    }

    return (
      <Tag {...attributes} id={id} className={classes}>
        {children || img}
      </Tag>
    );
  }
}

appnavbarbrand.propTypes = propTypes;
appnavbarbrand.defaultProps = defaultProps;

export default appnavbarbrand;
