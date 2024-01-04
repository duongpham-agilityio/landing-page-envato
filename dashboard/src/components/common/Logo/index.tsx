import { Text, useColorModeValue, theme } from '@chakra-ui/react';
import Link from 'next/link';

// Assets
import { LogoIcon } from '@app/components/Images';

const Logo = () => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  return (
    <Text as={Link} aria-label="link-to-home" href="/" display="inline-block">
      <LogoIcon colorFill={colorFill} />
    </Text>
  );
};

export default Logo;
