import { CircularProgress, Flex } from '@chakra-ui/react';
import { memo } from 'react';

const RefetchComponent = (): JSX.Element => (
  <Flex
    justifyContent="center"
    alignItems="center"
    w="full"
    height={270}
    bg="background.body.primary"
  >
    <CircularProgress isIndeterminate color="text.secondary" />
  </Flex>
);

const EfficiencyRefetch = memo(RefetchComponent);

export default EfficiencyRefetch;
