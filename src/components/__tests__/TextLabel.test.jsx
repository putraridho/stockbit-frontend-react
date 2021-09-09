import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextLabel from '../TextLabel';

test('render text label component', () => {
  const { container, getByText } = render(
    <TextLabel label="my label" text="lorem ipsum" />,
  );
  expect(container.querySelector('span').innerHTML).toContain('my label');
  expect(getByText('lorem ipsum')).toBeInTheDocument();
});
