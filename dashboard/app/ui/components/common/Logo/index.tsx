'use client';

import { Text } from '@chakra-ui/react';
import Link from 'next/link';

// Assets
import { LogoIcon } from '@/ui/components';
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
