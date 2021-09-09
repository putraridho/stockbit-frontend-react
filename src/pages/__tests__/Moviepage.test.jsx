import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Moviepage from '../Moviepage';
import store from '../../store';
import theme from '../../utils/chakraTheme';

const queryClient = new QueryClient();

beforeAll(() => {
  window.location = '/movie/tt0372784';
});

test('render movie page', () => {
  render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router initialEntries={['/movie/tt0372784']}>
            <Switch>
              <Route path="/movie/:id">
                <Moviepage />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>,
  );
});
