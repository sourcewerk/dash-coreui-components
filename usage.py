import dash_coreui_components as duc
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import dash_bootstrap_components as dbc


app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True
app.config.suppress_callback_exceptions = True # needed for simple multi-page apps, see https://dash.plot.ly/urls

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
        duc.appsidebar([
            duc.appsidebarheader(),
            duc.appsidebarform(),
            duc.appsidebarnav(id='current-url', navConfig={
                'items': [
                    {
                        'name': 'Dashboard',
                        'url': '/dashboard',
                        'icon': 'cui-speedometer icons',
                        'badge': {'variant': 'info', 'text': 'NEW'}
                    },
                    {
                        'name': 'Other',
                        'url': '/other',
                        'icon': 'cui-star icons',
                        'children': [
                            {
                                'name': 'Animals',
                                'url': '/other/animals',
                                'icon': 'cui-star icons',
                                'badge': {'variant': 'success', 'text': 'RAD'}
                            }
                        ]
                    },
                    {'name': 'Group Title', 'title': True},
                    {
                        'name': 'Disabled',
                        'url': '/',
                        'icon': 'cui-ban icons',
                        'attributes': { 'disabled': True },
                    }
                ]
            }),
            duc.appsidebarfooter(),
            duc.appsidebarminimizer()
        ], fixed=True, display='lg'),
        html.Main([
            'TODO appbreadcrumb',
            dbc.Container(id='page-content', fluid=True)
        ], className='main'),
        'TODO aside'
    ], className='app-body'),
    'TODO footer'
], className='app')


@app.callback(dash.dependencies.Output('page-content', 'children'),
              [dash.dependencies.Input('current-url', 'pathname')])
def display_page(pathname):
    content = None
    if pathname in ['/', '/dashboard']:
        content = html.Div([
            html.H3('Dashboard'),
            duc.testcomponent(
                id='testcomponent-input',
                value='my-value',
                label='my-label'
            ),
            html.Div(id='testcomponent-output')
        ])
    else:
        content = html.Div([
            html.H3('You are on page {}'.format(pathname)),
            html.P('nothing to see here...')
        ])
    return content

@app.callback(Output('testcomponent-output', 'children'),
              [Input('testcomponent-input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
