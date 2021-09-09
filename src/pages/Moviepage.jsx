import {
  Box,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import TextLabel from '../components/TextLabel';
import YearRatedRuntime from '../components/YearRatedRuntime';

function Moviepage() {
  const { id } = useParams();
  const history = useHistory();
  const { data, isLoading } = useQuery(['get movie', id], async () => {
    const { data: response } = await axios(
      `http://www.omdbapi.com?apikey=faf7e5bb&i=${id}`,
    );
    return response;
  });

  return (
    <Box pt={14}>
      <Box
        py={2}
        bgColor="gray.100"
        boxShadow="base"
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={14}
        zIndex="1"
      >
        <Container maxW="container.lg">
          <Text
            display="inline-block"
            lineHeight="36px"
            onClick={() => history.push('/')}
            cursor="pointer"
            fontWeight="600"
          >
            <ArrowBackIcon mr={1} />
            <Text as="span" display="inline-block" transform="translateY(1px)">
              Back
            </Text>
          </Text>
        </Container>
      </Box>
      <Container maxW="container.lg">
        {isLoading ? (
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
          <Box py={4} color="gray.600">
            <Flex mb={4}>
              {data.Poster !== 'N/A' && (
                <Image
                  src={data.Poster}
                  mr={4}
                  htmlWidth={300}
                  htmlHeight={444}
                />
              )}
              <Box>
                <Heading as="h1" mb={1}>
                  {data.Title}
                </Heading>
                <YearRatedRuntime
                  year={data.Year}
                  rated={data.Rated}
                  runtime={data.Runtime}
                />
                <TextLabel mb={1} label="Genres" text={data.Genre} />
                <TextLabel mb={1} label="Director" text={data.Director} />
                <TextLabel mb={1} label="Writer" text={data.Writer} />
                <TextLabel mb={1} label="Actors" text={data.Actors} />
                <Text>Ratings: </Text>
                <UnorderedList ml={0} listStyleType="none">
                  {data.Ratings.map((rating) => (
                    <ListItem
                      key={rating.Source}
                      position="relative"
                      pl={4}
                      _after={{
                        content: '""',
                        position: 'absolute',
                        left: '6px',
                        top: '11px',
                        h: 1,
                        w: 1,
                        bgColor: 'gray.600',
                        borderRadius: 4,
                      }}
                    >
                      <Text>{rating.Source}</Text>
                      <Text>{rating.Value}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </Flex>
            <Text mb={1} fontWeight="700">
              Plot
            </Text>
            <Text mb={4}>{data.Plot}</Text>
            <Text mb={1} fontWeight="700">
              Awards
            </Text>
            <Text mb={4}>{data.Awards}</Text>
            <TextLabel mb={1} label="Metascore" text={data.Metascore} />
            <TextLabel mb={1} label="IMDb Rating" text={data.imdbRating} />
            <TextLabel mb={1} label="IMDb Votes" text={data.imdbVotes} />
            <TextLabel mb={1} label="Box Office" text={data.BoxOffice} />
            <TextLabel mb={1} label="Production" text={data.Production} />
            {data.Website !== 'N/A' && (
              <Text>
                <Link href={data.Website}>Website</Link>
              </Text>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Moviepage;
