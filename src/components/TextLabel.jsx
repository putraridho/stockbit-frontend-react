import React from 'react';
import { Text } from '@chakra-ui/react';

function TextLabel({ text, label, ...props }) {
  return (
    <Text {...props}>
      <Text as="span" fontWeight="bold">
        {label}:
      </Text>{' '}
      {text}
    </Text>
  );
}

export default TextLabel;
