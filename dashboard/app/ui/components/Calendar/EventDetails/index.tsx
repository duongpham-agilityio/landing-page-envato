// Libs
import { memo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface EventDetailProps {
  title: string;
  time: string;
}

const EventDetail = ({ title, time }: EventDetailProps) => (
  <Box minW={{ sm: 400, md: 500 }} pb={4}>
    <Heading
      fontWeight="medium"
      color="text.primary"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      maxWidth={{ sm: '400px', md: '500px' }}
    >
      {title}
    </Heading>
    <Text mt={1} fontWeight="medium">
      {time}
    </Text>
  </Box>
);

const EventDetailMemorized = memo(EventDetail);

export default EventDetailMemorized;
