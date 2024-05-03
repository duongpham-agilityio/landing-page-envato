import { memo } from 'react';

import { Box, Text } from '@chakra-ui/react';

// Components
import TermAndConditionItem from './TermAndConditionItem';

// Constants
import { TERM_CONDITION } from '@/lib/constants';

const TermAndCondition = () => (
  <Box>
    <Text as="h3" fontWeight="bold" fontSize="2xl" mb={3}>
      Term and Conditions
    </Text>

    {TERM_CONDITION.map(({ id, heading, content, description, note }) => (
      <TermAndConditionItem
        key={id}
        heading={heading}
        content={content}
        description={description}
        note={note}
      />
    ))}
  </Box>
);

const TermCondition = memo(TermAndCondition);
export default TermCondition;
