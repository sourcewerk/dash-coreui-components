# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class approuteconditional(Component):
    """A approuteconditional component.
Route conditional component.

This component (and its children) are only visible if the browser's current URL matches its route prop.
This provides a light-weight client-side alternative to the server-side routing described in https://dash.plot.ly/urls.

Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The children.
- id (string; optional): The ID used to identify this component in Dash callbacks, defaults to `approuteconditional`.
- route (string; required): The route. This component is only visible if the browser's current URL matches the contents of this prop.
- className (string; optional): The CSS class name, defaults to `route-conditional`.
- tag (string; optional): The HTML tag, defaults to `div`.

Available events: """
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, route=Component.REQUIRED, className=Component.UNDEFINED, tag=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'route', 'className', 'tag']
        self._type = 'approuteconditional'
        self._namespace = 'dash_coreui_components'
        self._valid_wildcard_attributes =            []
        self.available_events = []
        self.available_properties = ['children', 'id', 'route', 'className', 'tag']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['route']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(approuteconditional, self).__init__(children=children, **args)

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
            return ('approuteconditional(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'approuteconditional(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
