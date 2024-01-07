import { memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';
import isEqual from 'react-fast-compare';

// Assets
import { Search } from '@/ui/components/Icons';

// Themes
import { colors } from '@/ui/themes/bases/colors';

// Components
import { InputField, Select, Selector } from '@/ui/components';

//Mocks
import { MONTHS_OPTIONS } from '@/lib/constants';

// Types
import { TOption } from '@/ui/components/common/Select';

export type TSearchValue = {
  search: string;
};

type TSearchProps = {
  searchValue: string;
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
};

const SearchBarComponent = ({
  searchValue,
  onSearch,
  onFilter,
}: TSearchProps): JSX.Element => {
  const renderTitleSelector = useCallback(() => <Selector />, []);

  // Form control for search
  const { control, resetField } = useForm<TSearchValue>({
    defaultValues: {
      search: searchValue,
    },
  });

  const searchIconColor: string = useColorModeValue(
    colors.secondary[400] ?? '',
    'common.white',
  );

  const handleSelectMonth = useCallback(
    ({ value }: TOption) => onFilter && onFilter(value),
    [onFilter],
  );

  const handleResetValue = useCallback(() => {
    resetField('search');
    onSearch('');
  }, [onSearch]);

  return (
    <HStack as="form" data-testid="search-bar" h={14} gap={5}>
      <Box
        display={{
          base: 'none',
          sm: 'block',
        }}
        flex={1}
      >
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onChange } }) => (
            <InputField
              value={value}
              onChange={(value: string) => {
                onChange(value);
                onSearch(value);
              }}
              placeholder="Search by name, email, or other..."
              variant="secondary"
              leftIcon={<Search color={searchIconColor} />}
              rightIcon={value && <p onClick={handleResetValue}>Close</p>} //TODO: update later
              data-testid="search-transaction"
            />
          )}
        />
      </Box>
      <Box
        h="100%"
        w={{
          base: '100%',
          sm: '30%',
          lg: '15%',
          xl: '12%',
        }}
      >
        <Select
          options={MONTHS_OPTIONS}
          renderTitle={renderTitleSelector}
          onSelect={handleSelectMonth}
        />
      </Box>
    </HStack>
  );
};

const SearchBar = memo(SearchBarComponent, isEqual);

export default SearchBar;
