import { Box, Container, Input } from '@chakra-ui/react';

import React from 'react';

function Search({ onSubmit, ...props }) {
  return (
    <Box
      py={2}
      bgColor="gray.100"
      boxShadow="base"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex="1"
    >
      <Container maxW="container.lg">
        <form onSubmit={onSubmit}>
          <Input
            type="search"
            placeholder="Movie title...."
            bgColor="white"
            {...props}
          />
        </form>
      </Container>
    </Box>
  );
}

export default Search;
