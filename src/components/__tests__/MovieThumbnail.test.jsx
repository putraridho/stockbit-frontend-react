import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

import MovieThumbnail from '../MovieThumbnail';

const movie = {
  Title: 'Batman Begins',
  Year: '2005',
  imdbID: 'tt0372784',
  Type: 'movie',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
};

jest.mock('react-router-dom', () => {
  const Link = ({ to, children }) => <a href={to}>{children}</a>;
  return { Link };
});

test('render movie thumbnail component', () => {
  const { getByText } = render(
    <MovieThumbnail movie={movie} to={`/movie/${movie.imdbID}`} />,
  );
  expect(getByText(movie.Title)).toBeInTheDocument();
});

test('click thumbnail to show off modal', () => {
  const { container } = render(
    <ChakraProvider>
      <MovieThumbnail movie={movie} to={`/movie/${movie.imdbID}`} />
    </ChakraProvider>,
  );

  const thumbnail = container.querySelector('[role="group"]');
  fireEvent.click(thumbnail);
  expect(document.querySelector('.modal')).toBeTruthy();
});
