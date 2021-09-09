import React, { useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Homepage from '../Homepage';
import store from '../../store';
import theme from '../../utils/chakraTheme';

test('render homepage', () => {
  const { container } = render(
    <Provider store={store}>
      <Homepage />
    </Provider>,
  );
  expect(container).toBeTruthy();
});

function HomepageWithSearch() {
  const history = useHistory();
  useEffect(() => {
    history.push({
      search: '?title=Batman',
    });
  }, [history]);

  return <Homepage />;
}

test('test query search', () => {
  render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/">
              <HomepageWithSearch />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>,
  );
});

test('searching', () => {
  const { container } = render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>,
  );
  const search = container.querySelector('input[type="search"]');
  const searchForm = container.querySelector('form');
  fireEvent.change(search, {
    target: { value: 'batman' },
  });
  fireEvent.submit(searchForm);
});
