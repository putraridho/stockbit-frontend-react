/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Button,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import MovieThumbnail from '../components/MovieThumbnail';
import Search from '../components/Search';
import { fetchMovies, nextPageMovies } from '../slices/moviesSlice';
import { params } from '../utils/params';

function Homepage() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    const _title = params().get('title');
    if (_title) {
      dispatch(fetchMovies(_title));
    }
  }, [dispatch]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      history.push({
        search: `?title=${title}`,
      });
      setPage(1);
      dispatch(fetchMovies(title));
    },
    [dispatch, history, title],
  );

  const loadMore = useCallback(() => {
    const loadMoreElement = document.getElementById('load-more');
    const loadMoreElementOffset =
      loadMoreElement.offsetTop + loadMoreElement.clientHeight;
    const windowOffset = window.pageYOffset + window.innerHeight;
    if (windowOffset > loadMoreElementOffset) {
      setPage((curr) => curr + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [loadMore]);

  useEffect(() => {
    if (page > 1) {
      dispatch(nextPageMovies(page));
    }
  }, [dispatch, page]);

  return (
    <Box pt={14}>
      <Search
        onSubmit={handleSearch}
        onChange={(e) => {
          const { value } = e.target;
          setTitle(value);
        }}
        defaultValue={params().get('title')}
      />
      <Box>
        <Container maxW="container.lg">
          {movies.status === 'idle' ? (
            <Box pt={4}>Type something to search</Box>
          ) : movies.status === 'loading' ? (
            <Box
              position="relative"
              h={200}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress isIndeterminate color="blue.200" />
            </Box>
          ) : (
            <>
              <Grid
                maxW="container.sm"
                mx="auto"
                templateColumns="repeat(2, 1fr)"
                gap={4}
                py={4}
              >
                {movies.data.map((movie, index) => (
                  <MovieThumbnail
                    key={`${movie.imdbID}-${index}`}
                    movie={movie}
                    to={`/movie/${movie.imdbID}`}
                  />
                ))}
              </Grid>
              {movies.data.length < movies.totalResults && (
                <Box py={4} textAlign="center">
                  <Button
                    fontWeight="500"
                    id="load-more"
                    isLoading={movies.status === 'loading more'}
                  >
                    Load More...
                  </Button>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Homepage;
