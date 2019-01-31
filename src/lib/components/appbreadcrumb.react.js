import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CustomEvent from './_shared/custom-event';

const propTypes = {
  /**
   * The children.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appbreadcrumb`.
   */
  id: PropTypes.string,

  /**
   * The CSS class name, defaults to `app-breadcrumb`.
   */
  className: PropTypes.string,

  /**
   * A list of dictionaries describing URL path in a human-readable way.
   * Defaults to `[{ path: '/', name: 'Home' }]`.
   */
  appRoutes: PropTypes.any,

  /**
   * The HTML tag, defaults to `div`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appbreadcrumb',
  tag: 'div',
  className: '',
  appRoutes: [{ path: '/', name: 'Home' }]
};

/**
 * CoreUI breadcrumb component.
 */
class appbreadcrumb extends Component {
  constructor(props) {
    super(props);

    this.linkClick = this.linkClick.bind(this);
  }

  componentDidMount() {
    const listener = () => {
      return () => {
        this.forceUpdate(); // force render()
      };
    };
    window.addEventListener('onpopstate', listener());
    //window.onpopstate = listener('POP'); // TODO how is 'POP' a parameter to listener()?

    // non-standard, emitted by Link.react
    window.addEventListener('onpushstate', listener());
  }

  linkClick(e, href, refresh = false) {
    // prevent anchor from updating location
    e.preventDefault();
    if (refresh) {
      window.location.pathname = href;
    } else {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new CustomEvent('onpushstate'));
    }
    // scroll back to top
    window.scrollTo(0, 0);
  }

  getPath(pathname) {
    const paths = ['/'];
    if (pathname === '/') return paths;
    pathname.split('/').reduce((prev, curr) => {
      const currPath = `${prev}/${curr}`;
      paths.push(currPath);
      return currPath;
    });
    return paths;
  }

  breadcrumbItem(item, key) {
    const { appRoutes } = this.props;
    const currentPathname = window.location.pathname; // TODO also handle other location properties, like href?
    const itemPath = item.split('/');
    const itemPathLastElement = itemPath[itemPath.length - 1];
    const itemPathLastElementUppercase = itemPathLastElement.charAt(0).toUpperCase() + itemPathLastElement.slice(1);
    const itemAppRouteName = appRoutes.find(route => route.path === item);  
    const itemName = itemAppRouteName ? itemAppRouteName.name : itemPathLastElementUppercase;

    if (item === currentPathname) {
      return <BreadcrumbItem active>{itemName}</BreadcrumbItem>
    } else {
      return (
        <BreadcrumbItem>
          <a href={item} onClick={e => this.linkClick(e, item, false)}>
            {itemName}
          </a>
        </BreadcrumbItem>
      );
    }
  }

  breadcrumb() {
    const pathname = window.location.pathname; // TODO also handle other location properties, like href?
    const path = this.getPath(pathname);
    const items = path.map((item, key) => this.breadcrumbItem(item, key));
    return (
      <Breadcrumb>
        {items}
      </Breadcrumb>
    );
  }

  render() {
    const { id, className, tag: Tag, ...attributes } = this.props;

    delete attributes.children
    delete attributes.appRoutes

    const classes = classNames(className, 'app-breadcrumb');

    return (
      <Tag id={id} className={classes}>
        {this.breadcrumb()}
      </Tag>
    );
  }
}

appbreadcrumb.propTypes = propTypes;
appbreadcrumb.defaultProps = defaultProps;

export default appbreadcrumb;
