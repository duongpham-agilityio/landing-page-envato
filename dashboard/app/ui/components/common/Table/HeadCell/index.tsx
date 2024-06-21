import { Flex, IconButton, Text, Th } from '@chakra-ui/react';
import { memo, useCallback } from 'react';

// Icons
import { Sort } from '@/ui/components/Icons';

// Themes
import { colors } from '@/ui/themes/bases/colors';

type THeaderCellProps<T> = {
  title?: string;
  columnKey: T;
  onSort?: (field: T) => void;
};

const HeaderCell = <T,>({
  title,
  columnKey,
  onSort,
}: THeaderCellProps<T>): JSX.Element => {
  const handleSort = useCallback(() => {
    onSort && onSort(columnKey);
  }, [columnKey, onSort]);

  if (!title) {
    return <Th w={50} maxW={50} />;
  }

  return (
    <Th
      key={title}
      py={5}
      px={0}
      sx={{
        minW: {
          base: 170,
          md: 'unset',
        },
      }}
    >
      <Flex alignItems="center" gap={2}>
        <Text
          color="text.secondary"
          textTransform="none"
          fontSize="sm"
          whiteSpace="break-spaces"
          maxW={200}
          noOfLines={1}
          title={title}
        >
          {title}
        </Text>
        {title !== 'Gallery Thumbnail' && (
          <IconButton
            aria-label={`This is the icon for ${title}`}
            w={7}
            h={7}
            bgColor="transparent"
            _hover={{
              bgColor: 'transparent',
            }}
            onClick={handleSort}
            data-testid="sort-icon"
          >
            <Sort color={colors.secondary[300]} opacityLeft={1} />
          </IconButton>
        )}
      </Flex>
    </Th>
  );
};

const HeaderCellMemorized = memo(HeaderCell) as typeof HeaderCell;

export default HeaderCellMemorized;
