import React, { Component } from 'react';
import { Badge, Nav, NavItem, NavLink } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const propTypes = {
  /**
   * The children, defaults to `navConfig.items`.
   */
  children: PropTypes.node,

  /**
   * The ID used to identify this component in Dash callbacks, defaults to `appsidebarnav`.
   */
  id: PropTypes.string.isRequired,

  /**
   * The CSS class name, defaults to `sidebar-nav`.
   */
  className: PropTypes.string,

  /**
   * The pathname in window.location - e.g., "/my/full/pathname"
   */
  pathname: PropTypes.string,

  /**
   * The search in window.location - e.g., "?myargument=1"
   */
  search: PropTypes.string,

  /**
   * The hash in window.location - e.g., "#myhash"
   */
  hash: PropTypes.string,

  /**
   * The href in window.location - e.g., "/my/full/pathname?myargument=1#myhash"
   */
  href: PropTypes.string,

  /**
   * Refresh the page when the location is updated? Default to `true`.
   */
  refresh: PropTypes.bool,

  /**
   * The setProps callback function provided by Dash iff a callback is connected.
   */
  setProps: PropTypes.func, 

  /**
   * The sidebar nav config, used to configure the contents of this sidebar nav.
   * Alternatively, you can add children manually, which will cause this prop to be ignored.
   * A sidebar nav config object has the following structure:
   * - title:
   * ````js
   * {
   *   title: true,
   *   name: 'Theme',
   *   class: ''              // optional class names space delimited list for title item ex: "text-center"
   *   wrapper: {             // optional wrapper object
   *     element: '',         // optional* valid HTML5 element tag ( *required when passing attributes)
   *     attributes: {}       // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
   *   },
   * },
   * ````
   * - item:
   * ````js
   * {
   *   name: 'Dashboard',
   *   url: '/dashboard',
   *   icon: `icon-speedometer',
   *   class: '',                    // optional
   *   variant: 'success',           // optional
   *   badge: {
   *     variant: 'info',
   *     text: 'NEW',
   *     class: ''                   // optional
   *   },
   *   attributes: { target: '_blank', rel: "noreferrer noopener", disabled: false, hidden: false }, // (v2.1.0 up) optional valid JS object with JS API naming
   * },
   * ````
   * - item with `children` array - works like `nav-dropdown-toggle` with `nav-dropdown-items`
   * ````js
   * {
   *   name: 'Icons',
   *   url: '/icons',
   *   icon: 'icon-star',
   *   children: [
   *     {
   *       name: 'Flags',     // item options apply
   *       url: '/icons/flags',
   *       icon: 'icon-star',
   *       badge: {
   *         variant: 'success',
   *         text: 'NEW'
   *       }
   *     },
   *   ]
   * }
   * ````
   * - divider:
   * ````js
   * {
   *   divider: true
   * },
   * ````
   * 
   * - order of precedence:
   * ````
   * title > divider > children > item
   * ````
   */
  navConfig: PropTypes.any,

  /**
   * TODO document this.
   */
  navFunc: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /**
   * The isOpen flag, defaults to `false`.
   */
  isOpen: PropTypes.bool,

  /**
   * TODO document this.
   */
  staticContext: PropTypes.any,

  /**
   * The HTML tag, defaults to `nav`.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  id: 'appsidebarnav',
  refresh: true,
  tag: 'nav',
  navConfig: {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'cui-speedometer icons',
        badge: { variant: 'info', text: 'NEW' }
      }]
  },
  isOpen: false
};

/*
 * event polyfill for IE
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
function CustomEvent(event, params) {
    // eslint-disable-next-line no-param-reassign
    params = params || {
        bubbles: false,
        cancelable: false,
        // eslint-disable-next-line no-undefined
        detail: undefined,
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
    );
    return evt;
}
CustomEvent.prototype = window.Event.prototype;

/**
 * CoreUI sidebar nav component.
 *
 * This component manages the location in a multi-page much as Dash Core Components `Location` component.
 * It is also compatible with the Dash Core Components `Link` component.
 * See https://dash.plot.ly/urls for details.
 */
class appsidebarnav extends Component {
  constructor(props) {
    super(props);

    this.updateLocation = this.updateLocation.bind(this);
    this.linkClick = this.linkClick.bind(this);
    this.dropdownClick = this.dropdownClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }

  updateLocation(props) {
    const {hash, href, pathname, refresh, search, setProps} = props;

    // Keep track of props relating to window.location that may need to be updated via setProps
    const propsToSet = {};

    /**
     * Check if the field exists in props. If the prop with "fieldName" is not defined,
     * then it was not set by the user and needs to be equal to the value in window.location.
     * This only happens on page load (since props will no longer be undefined after componentDidMount).
     *
     * @param {string} fieldName
     *  The name of the prop in window.location and in the component's prop
     *
     * @returns {boolean}
     *  Returns true if the prop with fieldName is different and the window state needs to be updated
     */
    const checkExistsUpdateWindowLocation = fieldName => {
      const propVal = props[fieldName];

      if ((propVal === undefined || propVal === null) && window.location[fieldName] !== undefined) {
        // propVal is undefined or null, but window.location has this fieldName defined
        propsToSet[fieldName] = window.location[fieldName];
      } else if (propVal !== window.location[fieldName]) {
        // Prop has changed?
        if (refresh) {
          // Refresh the page?
          window.location[fieldName] = propVal;
        } else if (this.props[fieldName] !== propVal) {
          // If this prop has changed, need to setProps
          propsToSet[fieldName] = propVal;
          // This (`${fieldName}`: propVal) needs to be pushed in the window.history
          return true;
        }
      }
      // This (`${fieldName}`: propVal) DOES NOT need to be pushed in the window.history
      return false;
    };

    // Check if the prop value needs to be updated (note that this mutates propsToSet)
    const pathnameUpdated = checkExistsUpdateWindowLocation('pathname');
    const hrefUpdated = checkExistsUpdateWindowLocation('href');
    const hashUpdated = checkExistsUpdateWindowLocation('hash');
    const searchUpdated = checkExistsUpdateWindowLocation('search');

    // propsToSet has been updated -- batch update to Dash
    if (setProps !== undefined && typeof setProps === 'function' && Object.keys(propsToSet).length > 0) {
      setProps(propsToSet);
    }

    // Special case -- overrides everything!
    if (hrefUpdated) {
      window.history.pushState({}, '', href);
    } else if (pathnameUpdated || hashUpdated || searchUpdated) {
      // Otherwise, we can mash everything together
      const searchVal = search !== undefined ? search : '';
      const hashVal = hash !== undefined ? hash : '';
      window.history.pushState(
        {},
        '',
        `${pathname}${searchVal}${hashVal}`
      );
    }
  }

  linkClick(e, href, refresh = false) {
    // prevent anchor from updating location
    e.preventDefault();
    this.hideMobile();
    if (refresh) {
      window.location.pathname = href;
    } else {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new CustomEvent('onpushstate'));
    }
    // scroll back to top
    window.scrollTo(0, 0);
  }

  dropdownClick(e) {
    e.preventDefault();
    e.currentTarget.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, activeClasses, notActiveClasses) {
    const {pathname} = this.props;
    return pathname == routeName // TODO this does not match if suffixes to the path are present
      ? activeClasses : notActiveClasses;
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-show')) {
      document.body.classList.toggle('sidebar-show');
    }
  }

  // nav list
  navList(items) {
    return items.map((item, index) => this.navType(item, index));
  }

  // nav type
  navType(item, idx) {
    return (
      item.title ? this.navTitle(item, idx)
        : item.divider ? this.navDivider(item, idx)
          : item.label ? this.navLabel(item, idx)
            : item.children ? this.navDropdown(item, idx)
              : this.navItem(item, idx)
    );
  }

  // nav list section title
  navTitle(title, key) {
    const classes = classNames('nav-title', title.class);
    return <li key={key} className={classes}>{this.navWrapper(title)} </li>;
  }

  // simple wrapper for nav-title item
  navWrapper(item) {
    return item.wrapper && item.wrapper.element ? React.createElement(item.wrapper.element, item.wrapper.attributes, item.name) : item.name;
  }

  // nav list divider
  navDivider(divider, key) {
    const classes = classNames('divider', divider.class);
    return <li key={key} className={classes} />;
  }

  // nav label with nav link
  navLabel(item, key) {
    const classes = {
      item: classNames('hidden-cn', item.class),
      link: classNames('nav-label', item.class ? item.class : ''),
      icon: classNames(
        'nav-icon',
        !item.icon ? 'fa fa-circle' : item.icon,
        item.label.variant ? `text-${item.label.variant}` : '',
        item.label.class ? item.label.class : '',
      )
    };
    return (
      this.navLink(item, key, classes)
    );
  }

  // nav dropdown
  navDropdown(item, key) {
    const classIcon = classNames('nav-icon', item.icon);
    return (
      <li key={key} className={this.activeRoute(item.url, 'nav-item nav-dropdown open', 'nav-item nav-dropdown')}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.dropdownClick}><i className={classIcon} />{item.name}{this.navBadge(item.badge)}</a>
        <ul className="nav-dropdown-items">
          {this.navList(item.children)}
        </ul>
      </li>);
  }

  // nav item with nav link
  navItem(item, key) {
    const classes = {
      item: classNames(item.class),
      link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
      icon: classNames('nav-icon', item.icon)
    };
    return (
      this.navLink(item, key, classes)
    );
  }

  // nav link
  navLink(item, key, classes) {
    const url = item.url ? item.url : '';
    const itemIcon = <i className={classes.icon} />
    const itemBadge = this.navBadge(item.badge)
    const attributes = item.attributes || {}
    const className = classes.link + this.activeRoute(item.url, ' active', '');
    return (
      <NavItem key={key} className={classes.item}>
        { attributes.disabled ?
            <NavLink href={""} className={className} {...attributes}>
              {itemIcon}{item.name}{itemBadge}
            </NavLink>
         :
          this.isExternal(url) ?
            <NavLink href={url} className={className} active {...attributes}>
              {itemIcon}{item.name}{itemBadge}
            </NavLink> :
            <a href={url} className={className} onClick={e => this.linkClick(e, url, false)} {...attributes}>
              {itemIcon}{item.name}{itemBadge}
            </a>
        }
      </NavItem>
    );
  }

  // badge addon to NavItem
  navBadge(badge) {
    if (badge) {
      const classes = classNames(badge.class);
      return (
        <Badge className={classes} color={badge.variant}>{badge.text}</Badge>
      );
    }
    return null;
  }

  isExternal(url) {
    const link = url ? url.substring(0, 4) : '';
    return link === 'http';
  }

  componentDidMount() {
    const listener = () => {
      return () => {
        const {setProps} = this.props;
        if (setProps) {
          setProps({
            pathname: window.location.pathname,
            href: window.location.href,
            hash: window.location.hash,
            search: window.location.search,
          });
        } else {
          this.forceUpdate(); // force render()
        }
      };
    };
    window.addEventListener('onpopstate', listener());
    //window.onpopstate = listener('POP'); // TODO how is 'POP' a parameter to listener()?

    // non-standard, emitted by Link.react
    window.addEventListener('onpushstate', listener());
    this.updateLocation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateLocation(nextProps);
  }

  render() {
    const { id, className, children, setProps, navConfig, ...attributes } = this.props;

    if (!setProps) {
      this.props.pathname = window.location.pathname;
      this.props.href = window.location.href;
      this.props.hash = window.location.hash;
      this.props.search = window.location.search;
    }

    delete attributes.isOpen
    delete attributes.staticContext
    delete attributes.Tag

    const navClasses = classNames(className, 'sidebar-nav');

    // ToDo: find better rtl fix
    const isRtl = getComputedStyle(document.querySelector('html')).direction === 'rtl'

    // sidebar-nav root
    return (
      <PerfectScrollbar className={navClasses} {...attributes} option={{ suppressScrollX: !isRtl }} >
        <Nav id={id}>
          {children || this.navList(navConfig.items)}
        </Nav>
      </PerfectScrollbar>
    );
  }
}

appsidebarnav.propTypes = propTypes;
appsidebarnav.defaultProps = defaultProps;

export default appsidebarnav;
