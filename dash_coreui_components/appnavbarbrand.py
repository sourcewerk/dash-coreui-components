# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class appnavbarbrand(Component):
    """A appnavbarbrand component.
CoreUI navbar brand component.

Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The children, defaults to `<img src width height alt className/>`.
- tag (string; optional): The HTML tag, defaults to `a`.
- className (string; optional): The CSS class name, defaults to `navbar-brand`.
- brand (boolean | number | string | dict | list; optional): The brand image, given as `{src, width, height, alt, className: 'navbar-brand' }`.
- full (boolean | number | string | dict | list; optional): The full size brand image, given as `{src, width, height, alt, className: 'navbar-brand-full' }`.
- minimized (boolean | number | string | dict | list; optional): The minimized brand image, given as `{src, width, height, alt, className: 'navbar-brand-minimized' }`."""
    @_explicitize_args
    def __init__(self, children=None, tag=Component.UNDEFINED, className=Component.UNDEFINED, brand=Component.UNDEFINED, full=Component.UNDEFINED, minimized=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'tag', 'className', 'brand', 'full', 'minimized']
        self._type = 'appnavbarbrand'
        self._namespace = 'dash_coreui_components'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'tag', 'className', 'brand', 'full', 'minimized']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(appnavbarbrand, self).__init__(children=children, **args)

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
            return ('appnavbarbrand(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'appnavbarbrand(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
