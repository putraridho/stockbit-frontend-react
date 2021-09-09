import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import YearRatedRuntime from '../YearRatedRuntime';

test('render year rated runtime component', () => {
  const { getByText } = render(
    <YearRatedRuntime year="2005" rated="PG-13" runtime="140 min" />,
  );
  expect(getByText('2005')).toBeInTheDocument();
  expect(getByText('PG-13')).toBeInTheDocument();
  expect(getByText('140 min')).toBeInTheDocument();
});
