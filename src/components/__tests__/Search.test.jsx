import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '../Search';

test('render search component', () => {
  const { container } = render(<Search defaultValue="test" />);
  expect(container).toBeTruthy();
  expect(container.querySelector('input').value).toBe('test');
});
