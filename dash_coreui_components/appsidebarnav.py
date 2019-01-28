# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class appsidebarnav(Component):
    """A appsidebarnav component.
CoreUI sidebar nav component.

This component manages the location in a multi-page much as Dash Core Components `Location` component.
It is also compatible with the Dash Core Components `Link` component.
See https://dash.plot.ly/urls for details.

Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The children, defaults to `navConfig.items`.
- id (string; optional): The ID used to identify this component in Dash callbacks, defaults to `appsidebarnav`.
- className (string; optional): The CSS class name, defaults to `sidebar-nav`.
- pathname (string; optional): The pathname in window.location - e.g., "/my/full/pathname"
- search (string; optional): The search in window.location - e.g., "?myargument=1"
- hash (string; optional): The hash in window.location - e.g., "#myhash"
- href (string; optional): The href in window.location - e.g., "/my/full/pathname?myargument=1#myhash"
- refresh (boolean; optional): Refresh the page when the location is updated? Default to `true`.
- navConfig (boolean | number | string | dict | list; optional): The sidebar nav config, used to configure the contents of this sidebar nav.
Alternatively, you can add children manually, which will cause this prop to be ignored.
A sidebar nav config object has the following structure:
- title:
````js
{
  title: true,
  name: 'Theme',
  class: ''              // optional class names space delimited list for title item ex: "text-center"
  wrapper: {             // optional wrapper object
    element: '',         // optional* valid HTML5 element tag ( *required when passing attributes)
    attributes: {}       // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
  },
},
````
- item:
````js
{
  name: 'Dashboard',
  url: '/dashboard',
  icon: `icon-speedometer',
  class: '',                    // optional
  variant: 'success',           // optional
  badge: {
    variant: 'info',
    text: 'NEW',
    class: ''                   // optional
  },
  attributes: { target: '_blank', rel: "noreferrer noopener", disabled: false, hidden: false }, // (v2.1.0 up) optional valid JS object with JS API naming
},
````
- item with `children` array - works like `nav-dropdown-toggle` with `nav-dropdown-items`
````js
{
  name: 'Icons',
  url: '/icons',
  icon: 'icon-star',
  children: [
    {
      name: 'Flags',     // item options apply
      url: '/icons/flags',
      icon: 'icon-star',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    },
  ]
}
````
- divider:
````js
{
  divider: true
},
````

- order of precedence:
````
title > divider > children > item
````
- navFunc (string; optional): TODO document this.
- isOpen (boolean; optional): The isOpen flag, defaults to `false`.
- staticContext (boolean | number | string | dict | list; optional): TODO document this.
- tag (string; optional): The HTML tag, defaults to `nav`.

Available events: """
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, className=Component.UNDEFINED, pathname=Component.UNDEFINED, search=Component.UNDEFINED, hash=Component.UNDEFINED, href=Component.UNDEFINED, refresh=Component.UNDEFINED, navConfig=Component.UNDEFINED, navFunc=Component.UNDEFINED, isOpen=Component.UNDEFINED, staticContext=Component.UNDEFINED, tag=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'pathname', 'search', 'hash', 'href', 'refresh', 'navConfig', 'navFunc', 'isOpen', 'staticContext', 'tag']
        self._type = 'appsidebarnav'
        self._namespace = 'dash_coreui_components'
        self._valid_wildcard_attributes =            []
        self.available_events = []
        self.available_properties = ['children', 'id', 'className', 'pathname', 'search', 'hash', 'href', 'refresh', 'navConfig', 'navFunc', 'isOpen', 'staticContext', 'tag']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(appsidebarnav, self).__init__(children=children, **args)

    def __repr__(self):
        if(any(getattr(self, c, None) is not None
               for c in self._prop_names
               if c is not self._prop_names[0])
           or any(getattr(self, c, None) is not None
                  for c in self.__dict__.keys()
                  if any(c.startswith(wc_attr)
                  for wc_attr in self._valid_wildcard_attributes))):
            props_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self._prop_names
                                      if getattr(self, c, None) is not None])
            wilds_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self.__dict__.keys()
                                      if any([c.startswith(wc_attr)
                                      for wc_attr in
                                      self._valid_wildcard_attributes])])
            return ('appsidebarnav(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'appsidebarnav(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
