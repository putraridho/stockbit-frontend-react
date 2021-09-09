import {
  Box,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function MovieThumbnail({ movie, to }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="relative" role="group" h="100%" onClick={onOpen}>
        <Image src={movie.Poster} h="100%" w="100%" objectFit="cover" />
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          textAlign="center"
          width="100%"
          height="100%"
          p={2}
          top={0}
          left={0}
          color="white"
          background="rgba(0, 0, 0, 0.5)"
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          className="thumbnail"
        >
          <Text mb={4}>{movie.Title}</Text>
          <Link to={to}>
            <Text
              py={1}
              px={3}
              borderRadius="40"
              fontSize="12px"
              fontWeight="500"
              bgColor="orange.500"
              color="white"
            >
              View Detail
            </Text>
          </Link>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="modal">
          <Image src={movie.Poster} />
        </ModalContent>
      </Modal>
    </>
  );
}
export default MovieThumbnail;
