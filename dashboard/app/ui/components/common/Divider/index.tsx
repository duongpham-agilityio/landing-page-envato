import { memo } from 'react';
import {
  AbsoluteCenter,
  Box,
  Divider as ChakraProvider,
} from '@chakra-ui/react';

type TDividerProps = {
  content?: string;
};

const DividerComponent = ({ content = '' }: TDividerProps) => (
  <Box position="relative" w="full" m="auto" py="10">
    <ChakraProvider w="full" bg="gray.500" _dark={{ height: '1px' }} />

    <AbsoluteCenter
      _light={{ bg: 'common.white' }}
      _dark={{ bg: 'secondary.600' }}
      px="4"
      color="border.divider"
      top="50%"
      transform="translate(-50%, -50%)"
    >
      {content}
    </AbsoluteCenter>
  </Box>
);

const Divider = memo(DividerComponent);

export default Divider;
