'use client';

import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => (
  <Flex justifyContent="center" p={5}>
    <Spinner />
  </Flex>
);

export default Loading;
