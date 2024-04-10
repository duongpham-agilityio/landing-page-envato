import { memo } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';

interface IconButtonProps {
  children: JSX.Element;
  hasNewNotification?: boolean;
  quantityNotification?: number;
  ariaLabel?: string;
  onClick?: () => void;
}

const IconButtonComponent = ({
  children,
  hasNewNotification = false,
  quantityNotification = 0,
  ariaLabel = 'Send email',
  onClick,
}: IconButtonProps) => (
  <Box data-testid="icon-button-component" pos="relative" maxW="fit-content">
    {hasNewNotification && (
      <Text
        as="p"
        pos="absolute"
        bg="danger.500"
        rounded="full"
        minW="15px"
        h="15px"
        px="3px"
        textAlign="center"
        top="0px"
        right="-5px"
        fontSize="xs"
        zIndex={1}
        color="white"
        lineHeight="1.4"
      >
        {quantityNotification === 0 ? '' : quantityNotification}
      </Text>
    )}
    <IconButton
      as="div"
      cursor="pointer"
      data-testid="icon-button"
      pos="relative"
      variant="iconPrimary"
      w="52px"
      h="52px"
      aria-label={ariaLabel}
      icon={children}
      onClick={onClick}
      role="button"
    />
  </Box>
);

const CustomIconButton = memo(IconButtonComponent);
export default CustomIconButton;
