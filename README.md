# dash-coreui-components

[CoreUI](https://coreui.io) components for Plotly Dash.

![](demo.gif)

dash-coreui-components is a Dash component library.

`assets/` contains demo assets for the demo app `usage.py`.

**IMPORTANT:** If you want to use CoreUI Icons in your app (namespace `@coreui/icons`, you'll need to have `assets/fonts/CoreUI-Icons-Linear-Free.*` and `assets/css/coreui-icons.min.css`.

Get started with:
1. Install Dash and its dependencies: https://dash.plot.ly/installation
2. Run `./build_and_run_usage_py.sh`. This will build the project in dev mode ans runs the example in `usage.py`.
3. Visit http://localhost:8050 in your web browser

The example in `usage.py` shows how to wire-up dash-coreui-components to a typical multi-page dashboard app.


## Contributing

Thank you for considering a contribution!
Pull requests are welcome.
Please see https://github.com/plotly/dash-component-boilerplate for information on the architecture of Dash components.


## Testing

dash-coreui-components comes with integration tests in the `tests/` folder.
Install the test requirements with `pip install -r tests/requirements.txt`.

To run the tests, use `pytest --driver Chrome tests/` or simply `test_usage_py.sh`.
Other drivers (IE, Firefox) can also be used.


## Creating and Publishing Production Builds

Run `make_python_dist.sh` to create a Python package tarball.
This distribution tarball will get generated in the `dist/` folder.

Test your tarball by copying it into a new environment and installing it locally.
If it works, you can publish on PyPI via `twine upload dist/*` and on NPM via `npm publish`.


# Acknowledgements

* [Plotly Dash](https://plot.ly/products/dash/)
* [CoreUI](https://coreui.io)
* [coreui-react](https://github.com/coreui/coreui-react)

