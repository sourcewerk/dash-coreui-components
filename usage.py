import dash
from dash.dependencies import Input, Output
import dash_core_components as dcc
import dash_coreui_components as duc
import dash_html_components as html
import dash_bootstrap_components as dbc
import plotly.graph_objs as go
import numpy as np


app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True
app.config.suppress_callback_exceptions = True # needed for simple multi-page apps, see https://dash.plot.ly/urls

dashboard_layout = html.Div([
    html.H3('Dashboard'),
    dcc.Textarea(
        id='dashboard-test-textarea',
        placeholder='Enter a value...',
        value='Hello, world!',
        rows=20,
        style={'width': '100%', 'height': 'auto'}
    ),
    html.Div(id='dashboard-test-output')
])

charts_layout = html.Div([
    html.H3('Charts'),
    dbc.Card([
        dbc.CardHeader('Random Walk'),
        dbc.CardBody([
            dcc.Graph(id='charts-graph-output')
        ])
    ])
])

other_animals_layout = html.Div([
    html.H3('Other Animals'),
    html.P('You are on the page for other animals.'),
    html.Div(id='other-animals-test-output')
])

app.title = 'Dash CoreUI Components Demo'

app.layout = html.Div([
    duc.appheader([
        duc.appsidebartoggler(id='appsidebartogglerlg', className='d-lg-none', display='md', mobile=True),
        duc.appnavbarbrand(
            full={'src': '/assets/images/logo.svg', 'width': 89, 'height': 25, 'alt': 'CoreUI Logo'},
            minimized={'src': '/assets/images/sygnet.svg', 'width': 30, 'height': 30, 'alt': 'CoreUI Logo'}
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
                        'url': '/',
                        'icon': 'cui-speedometer icons',
                        'badge': {'variant': 'info', 'text': 'NEW'}
                    },
                    {
                        'name': 'Charts',
                        'url': '/charts',
                        'icon': 'cui-chart icons'
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
                        'attributes': {'disabled': True},
                    }
                ]
            }),
            duc.appsidebarfooter(),
            duc.appsidebarminimizer()
        ], fixed=True, display='lg'),
        html.Main([
            duc.appbreadcrumb(appRoutes=[{'path': '/', 'name': 'Dashboard'}]),
            #dbc.Container(id='page-content', fluid=True)
            dbc.Container([
                duc.approuteconditional(route='/', children=dashboard_layout),
                duc.approuteconditional(route='/charts', children=charts_layout),
                duc.approuteconditional(route='/other/animals', children=other_animals_layout)
            ], id='page-content', fluid=True)
        ], className='main'),
        duc.appaside([
            duc.approuteconditional(route='/', children=dbc.Form([
                html.H6('Dashboard Settings'),
                dbc.FormGroup([
                    dbc.Label('Aside Dropdown', html_for='dashboard-aside-dropdown'),
                    dcc.Dropdown(
                        id='dashboard-aside-dropdown',
                        options=[{'label': 'Option 1', 'value': 1}, {'label': 'Option 2', 'value': 2}],
                    ),
                ]),
                dbc.FormGroup([
                    dbc.Label('Aside Slider', html_for='dashboard-aside-slider'),
                    dcc.Slider(id='dashboard-aside-slider', min=0, max=10, step=0.5, value=3),
                ])
            ], className='tab-pane p-3')),
            duc.approuteconditional(route='/charts', children=dbc.Form([
                html.H6('Charts Settings'),
                dbc.FormGroup([
                    dbc.Label('Random Walk SD', html_for='charts-aside-random-walk-sd-slider'),
                    dcc.Slider(id='charts-aside-random-walk-sd-slider', min=0, max=6, step=0.1, value=1),
                ])
            ], className='tab-pane p-3')),
            duc.approuteconditional(route='/other/animals', children=dbc.Form([
                html.H6('Other Animals Settings'),
                dbc.FormGroup([
                    dbc.Label('Aside Input', html_for='other-animals-aside-input'),
                    dcc.Input(
                        id='other-animals-aside-input',
                        type='text',
                        value='',
                        style={'width': '100%'},
                        placeholder='Enter a value'
                    ),
                ])
            ], className='tab-pane p-3'))
        ], fixed=True)
    ], className='app-body'),
    duc.appfooter([
        html.Span('Dash CoreUI Components © 2019 sourcewerk GmbH'),
        html.Span(['Powered by ', html.A('CoreUI for React', href='https://coreui.io/react')], className='ml-auto')
    ])
], className='app')


#@app.callback(dash.dependencies.Output('page-content', 'children'),
#              [dash.dependencies.Input('current-url', 'pathname')])
#def display_page(pathname):
#    content = None
#    if pathname in ['/', '/dashboard']:
#        content = dashboard_layout 
#    elif pathname == '/other/animals':
#        content = other_animals_layout
#    else:
#        content = html.Div([
#            html.H3('You are on page {}'.format(pathname)),
#            html.P('nothing to see here...')
#        ])
#    return content

@app.callback(Output('dashboard-test-output', 'children'),
              [Input('dashboard-test-textarea', 'value'),
               Input('dashboard-aside-dropdown', 'value'),
               Input('dashboard-aside-slider', 'value')])
def dashboard_test_output(dashboard_test_textarea_value, dashboard_aside_dropdown_value, dashboard_aside_slider_value):
    return f'You have entered "{dashboard_test_textarea_value}". You selected {dashboard_aside_dropdown_value} in the aside dropdown and the aside slider sits at {dashboard_aside_slider_value}.'

@app.callback(Output('charts-graph-output', 'figure'),
              [Input('charts-aside-random-walk-sd-slider', 'value')])
def charts_graph_output(charts_aside_random_walk_sd_slider):
    N = 1000
    x = np.linspace(0, 1, N)
    y = np.cumsum(np.square(charts_aside_random_walk_sd_slider) * np.random.randn(N))
    return { 'data': [go.Scatter(x=x, y=y)]} 

@app.callback(Output('other-animals-test-output', 'children'),
              [Input('dashboard-test-textarea', 'value'),
               Input('other-animals-aside-input', 'value')])
def other_animals_test_output(dashboard_test_textarea_value, other_animals_aside_input_value):
    return f'You have entered "{dashboard_test_textarea_value}" on the Dashboard and "{other_animals_aside_input_value}" in the aside settings.'


if __name__ == '__main__':
    app.run_server(debug=True)
