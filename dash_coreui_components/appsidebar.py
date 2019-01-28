# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class appsidebar(Component):
    """A appsidebar component.
CoreUI sidebar component.

Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The children, supports `appsidebarfooter`, `appsidebarform`, `appsidebarheader`, `appsidebarminimizer`, and `appsidebarnav`.
- id (string; optional): The ID used to identify this component in Dash callbacks, defaults to `appsidebar`.
- className (string; optional): The CSS class name, defaults to `sidebar`.
- compact (boolean; optional): The compact flag, defaults to `false`.
- display (string; optional): The display bootstrap class.
- fixed (boolean; optional): The fixed flag, defaults to `false`.
- minimized (boolean; optional): The minimized flag, defaults to `false`.
- isOpen (boolean; optional): The isOpen flag, defaults to `false`.
- offCanvas (boolean; optional): The offCanvas flag, defaults to `false`.
- staticContext (boolean | number | string | dict | list; optional): TODO document this.
- tag (string; optional): The HTML tag, defaults to `div`.

Available events: """
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, className=Component.UNDEFINED, compact=Component.UNDEFINED, display=Component.UNDEFINED, fixed=Component.UNDEFINED, minimized=Component.UNDEFINED, isOpen=Component.UNDEFINED, offCanvas=Component.UNDEFINED, staticContext=Component.UNDEFINED, tag=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'compact', 'display', 'fixed', 'minimized', 'isOpen', 'offCanvas', 'staticContext', 'tag']
        self._type = 'appsidebar'
        self._namespace = 'dash_coreui_components'
        self._valid_wildcard_attributes =            []
        self.available_events = []
        self.available_properties = ['children', 'id', 'className', 'compact', 'display', 'fixed', 'minimized', 'isOpen', 'offCanvas', 'staticContext', 'tag']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(appsidebar, self).__init__(children=children, **args)

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
            return ('appsidebar(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'appsidebar(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
