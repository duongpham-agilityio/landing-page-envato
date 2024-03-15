import { Flex, IconButton, Text, Th } from '@chakra-ui/react';
import { memo } from 'react';

// Icons
import { Sort } from '@/ui/components/Icons';

// Themes
import { colors } from '@/ui/themes/bases/colors';

type THeadCellProps = {
  title?: string;
  onClick?: () => void;
};

const HeadCellComponent = ({ title, onClick }: THeadCellProps): JSX.Element => (
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
          onClick={onClick}
          data-testid="sort-icon"
        >
          <Sort color={colors.secondary[300]} opacityLeft={1} />
        </IconButton>
      )}
    </Flex>
  </Th>
);

const HeadCell = memo(HeadCellComponent);

export default HeadCell;
