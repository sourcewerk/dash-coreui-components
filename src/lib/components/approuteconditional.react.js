import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `approuteconditional`.
   */
  id: PropTypes.string.isRequired,

  /**
   * The route. This component is only visible if the browser's current URL matches the contents of this prop.
   */
  route: PropTypes.string.isRequired,

  /**
   * The CSS class name, defaults to `route-conditional`.
   */
  className: PropTypes.string,

  /**
   * The HTML tag, defaults to `div`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'approuteconditional',
  tag: 'div',
};

/**
 * Route conditional component.
 *
 * This component (and its children) are only visible if the browser's current URL matches its route prop.
 * This provides a light-weight client-side alternative to the server-side routing described in https://dash.plot.ly/urls.
 */
class approuteconditional extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const listener = () => {
      return () => {
        this.forceUpdate(); // force render()
        // TODO HACK: Create a synthetic window resize event to cause Plotly graphs to re-render.
        window.dispatchEvent(new Event('resize'));
      };
    };
    window.addEventListener('onpopstate', listener());
    //window.onpopstate = listener('POP'); // TODO how is 'POP' a parameter to listener()?

    // non-standard, emitted by Link.react
    window.addEventListener('onpushstate', listener());
  }

  activeRoute(routeName) {
    const pathname = window.location.pathname; // TODO also handle other location properties, like href?
    return pathname == routeName // TODO this does not match if suffixes to the path are present
      ? '' : 'd-none'; // 'd-none' is a Bootstrap 4 class that sets the display attribute to 'none'.
  }

  render() {
    const { id, route, className, children, tag: Tag, ...attributes } = this.props;

    const classes = classNames(className, 'route-conditional', this.activeRoute(route));

    return (
      <Tag id={id} className={classes}>
        {children}
      </Tag>
    );
  }
}

approuteconditional.propTypes = propTypes;
approuteconditional.defaultProps = defaultProps;

export default approuteconditional;
