import dash_coreui_components
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import dash_bootstrap_components as dbc

app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    dash_coreui_components.appheader([
        dash_coreui_components.appsidebartoggler(className="d-lg-none", display="md", mobile=True),
        'TODO header'
    ], fixed=True),
    html.Div([
        'TODO appsidebar',
        html.Main([
            'TODO appbreadcrumb',
            dbc.Container([
                dash_coreui_components.testcomponent(
                    id='input',
                    value='my-value',
                    label='my-label'
                ),
                html.Div(id='output')
            ], fluid=True)
        ], className='main'),
        'aside'
    ], className='app-body'),
    'footer'
], className='app')

@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
