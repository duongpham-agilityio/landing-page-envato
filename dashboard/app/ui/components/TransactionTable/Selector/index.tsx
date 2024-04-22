import { Center } from '@chakra-ui/react';
import { memo } from 'react';

// Icons
import { FilterIcon } from '@/ui/components/Icons';

// Themes
import { useColorfill } from '@/ui/themes/bases/colors';

const SelectorComponent = (): JSX.Element => {
  const { senary } = useColorfill();

  return (
    <Center
      as="span"
      textAlign="center"
      fontSize="md"
      color="text.currencyColor"
      gap={3}
    >
      <FilterIcon stroke={senary} />
      Filters
    </Center>
  );
};

const Selector = memo(SelectorComponent);

export default Selector;
