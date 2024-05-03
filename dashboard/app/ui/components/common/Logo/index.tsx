'use client';

import { Text } from '@chakra-ui/react';
import Link from 'next/link';

// Components
import { LogoIcon } from '@/ui/components';

// Themes
import { useColorfill } from '@/ui/themes/bases';

const Logo = () => {
  const { primary } = useColorfill();

  return (
    <Text as={Link} aria-label="link-to-home" href="/" display="inline-block">
      <LogoIcon colorFill={primary} />
    </Text>
  );
};

export default Logo;
