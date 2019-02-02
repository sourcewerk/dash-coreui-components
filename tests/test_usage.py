import pytest
from pytest_dash.utils import (
    import_app,
    wait_for_text_to_equal,
    wait_for_element_by_css_selector
)
from selenium.webdriver.support.ui import Select


@pytest.fixture
def usage_app(dash_threaded):
    # Start a dash app contained in `usage.py`
    # dash_threaded is a fixture by pytest-dash
    # It will load a py file containing a Dash instance named `app`
    # and start it in a thread.
    app = import_app('usage')
    dash_threaded(app)
    return app

def test_dashboard_test_textarea(usage_app, selenium):
    dashboard_test_textarea = wait_for_element_by_css_selector(selenium, '#dashboard-test-textarea')
    assert 'Hello, world!' == dashboard_test_textarea.get_attribute('value')
    dashboard_test_textarea.send_keys('TEST')
    wait_for_text_to_equal(selenium, '#dashboard-test-output',
            'You have entered "Hello, world!TEST". You selected None in the aside dropdown and the aside slider sits at 3.')

