'use client';

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { MouseEventHandler, memo, useState } from 'react';
import isEqual from 'react-fast-compare';

const PRIMARY_BG_COLOR = 'background.component.select.primary';
const SECONDARY_BG_COLOR = 'background.component.select.primary';
const NO_COLOR = 'background.component.select.secondary';
const NO_BG = 'background.component.select.noBackground';

const BORDER_STYLES = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.primary',
};
const VARIANTS = {
  primary: {
    bgColor: SECONDARY_BG_COLOR,
    ...BORDER_STYLES,
    _hover: {
      background: SECONDARY_BG_COLOR,
      ...BORDER_STYLES,
    },
    _active: {
      background: SECONDARY_BG_COLOR,
    },
    _dark: {
      border: 'none',
    },
  },
  secondary: {
    bgColor: NO_COLOR,
    ...BORDER_STYLES,
    _hover: {
      background: NO_COLOR,
      ...BORDER_STYLES,
    },
    _active: {
      background: NO_COLOR,
    },
  },
  'no-border': {
    bgColor: PRIMARY_BG_COLOR,

    _hover: {
      background: PRIMARY_BG_COLOR,
    },
    _active: {
      background: PRIMARY_BG_COLOR,
    },
  },
  'no-background': {
    bgColor: NO_BG,

    _hover: {
      background: NO_BG,
    },
    _active: {
      background: NO_BG,
    },
  },
};
const SIZES = {
  sm: {
    px: 3,
  },
  md: {
    px: 5,
  },
};

export type TOption = {
  value: string;
  label: string;
};

type TSelectProps = {
  title?: string;
  options?: TOption[];
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
  renderTitle?: (option: TOption) => JSX.Element;
  renderOption?: (option: TOption) => JSX.Element;
  onSelect?: (option: TOption) => void;
};

const SelectComponent = ({
  options = [],
  variant = 'primary',
  size = 'md',
  renderTitle,
  renderOption,
  onSelect,
}: TSelectProps): JSX.Element => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        h="100%"
        textAlign="left"
        borderRadius="lg"
        {...VARIANTS[variant]}
        {...SIZES[size]}
      >
        {renderTitle && renderTitle(options[selected])}
        {!renderTitle && (
          <Text as="span" fontSize="sm" textTransform="capitalize">
            {options[selected]?.label}
          </Text>
        )}
      </MenuButton>
      <MenuList
        p={0}
        minW={0}
        boxShadow="lg"
        borderRight="lg"
        border="none"
        overflow="hidden"
        bg="background.component.selectList"
      >
        {options.map((option: TOption, index: number): JSX.Element => {
          const { label } = option;
          const handleSelected: MouseEventHandler = () => {
            setSelected(index);
            onSelect && onSelect(option);
          };

          return (
            <MenuItem
              key={label}
              bg="background.component.selectList"
              borderRadius="none"
              py={2}
              _hover={{
                borderColor: 'transparent',
                _light: { bgColor: 'secondary.200' },
                _dark: { bgColor: 'secondary.400' },
              }}
              _focus={{ borderColor: 'transparent', outline: 'none' }}
              onClick={handleSelected}
              {...SIZES[size]}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="capitalize"
              >
                {renderOption ? renderOption(option) : label}
              </Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

const Select = memo(SelectComponent, isEqual);

export default Select;
