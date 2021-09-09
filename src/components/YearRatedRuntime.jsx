import { UnorderedList, ListItem } from '@chakra-ui/react';
import React from 'react';

function YearRatedRuntime({ year, rated, runtime }) {
  return (
    <UnorderedList
      display="flex"
      listStyleType="none"
      mx={0}
      mb={4}
      color="gray.500"
    >
      {[year, rated, runtime].map((text) => (
        <ListItem
          key={text}
          _notFirst={{
            position: 'relative',
            pl: 4,
            _after: {
              content: '""',
              position: 'absolute',
              left: '6px',
              top: '11px',
              h: 1,
              w: 1,
              bgColor: 'gray.500',
              borderRadius: 4,
            },
          }}
        >
          {text}
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default YearRatedRuntime;
