import dash_coreui_components as duc
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import dash_bootstrap_components as dbc

app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    duc.appheader([
        duc.appsidebartoggler(id='appsidebartogglerlg', className='d-lg-none', display='md', mobile=True),
        duc.appnavbarbrand(
            full={'src': 'assets/images/logo.svg', 'width': 89, 'height': 25, 'alt': 'CoreUI Logo'},
            minimized={'src': 'assets/images/sygnet.svg', 'width': 30, 'height': 30, 'alt': 'CoreUI Logo'}
        ),
        duc.appsidebartoggler(id='appsidebartogglermd', className='d-md-down-none', display='lg'),
        dbc.Nav([
            dbc.NavItem(
                dbc.NavLink([html.I(className='cui-bell icons font-xl d-block'), dbc.Badge('5', pill=True, color='danger')], href='#'),
                className='d-md-down-none'
            ),
            dbc.NavItem(
                dbc.NavLink(html.I(className='cui-list icons font-xl d-block'), href='#'),
                className='d-md-down-none'
            ),
            dbc.NavItem(
                dbc.NavLink(html.I(className='cui-location-pin icons font-xl d-block'), href='#'),
                className='d-md-down-none'
            ),
            duc.appheaderdropdown([
                dbc.DropdownMenu([
                    dbc.DropdownMenuItem('User Info'),
                    dbc.DropdownMenuItem('Logout Max Mustermann')
                ], nav=True, label='MM')
            ])
        ], className='ml-auto', navbar=True),
        duc.appasidetoggler(id='appasidetogglermd', className='d-md-down-none'),
        duc.appasidetoggler(id='appasidetogglerlg', className='d-lg-none', mobile=True)
    ], fixed=True),
    html.Div([
        'TODO appsidebar',
        html.Main([
            'TODO appbreadcrumb',
            dbc.Container([
                duc.testcomponent(
                    id='input',
                    value='my-value',
                    label='my-label'
                ),
                html.Div(id='output')
            ], fluid=True)
        ], className='main'),
        'TODO aside'
    ], className='app-body'),
    'TODO footer'
], className='app')

@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
