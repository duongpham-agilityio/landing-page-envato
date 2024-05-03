'use client';

import Image from 'next/image';
import { memo, useMemo } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// Constants
import { IMAGES, ROUTES } from '@/lib/constants';

// Utils
import { generatePlaceholder } from '@/lib/utils';

// Interfaces
import { TImageDetails } from '@/lib/interfaces';

interface BenefitProps {
  pathName?: string;
}

const BenefitComponent = ({ pathName }: BenefitProps) => {
  const { url, alt, width, height }: TImageDetails = useMemo(
    (): TImageDetails =>
      pathName === `/${ROUTES.LOGIN}` ? IMAGES.SIGN_IN : IMAGES.SIGN_UP,
    [pathName],
  );

  const pathLogin = pathName !== `/${ROUTES.FORGOT_PASSWORD}`;

  return (
    pathLogin && (
      <Flex
        w={width}
        p={20}
        minH="100vh"
        alignItems="center"
        position="relative"
        flexDirection="column"
        display={{ base: 'none', lg: 'block' }}
        width="50%"
        backgroundColor="background.section.primary"
      >
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={generatePlaceholder(width, height)}
        />
        <Box position="absolute" top={10} left={8} w={115} h={115}>
          <Image
            src={IMAGES.SQUARE.url}
            alt={IMAGES.SQUARE.alt}
            fill
            placeholder="blur"
            blurDataURL={generatePlaceholder(115, 115)}
          />
        </Box>
        <Box position="absolute" top={14} right={12} w={27} h={143}>
          <Image
            src={IMAGES.VLINE.url}
            alt={IMAGES.VLINE.alt}
            fill
            placeholder="blur"
            blurDataURL={generatePlaceholder(27, 143)}
          />
        </Box>
        <Box position="absolute" bottom={1} left={8} w={81} h={81}>
          <Image
            src={IMAGES.DOTTED.url}
            alt={IMAGES.DOTTED.alt}
            fill
            placeholder="blur"
            blurDataURL={generatePlaceholder(81, 81)}
          />
        </Box>
        <Box
          fontFamily="primary"
          textAlign="center"
          m="0 auto"
          w={{ '2xl': '500px' }}
        >
          <Heading
            as="h2"
            variant="heading4Xl"
            marginBottom={4}
            color="text.primary"
          >
            Speady, Easy and Fast
          </Heading>

          <Text fontWeight="medium" fontSize="sm" textAlign="center">
            BankCo. help you set saving goals, earn cash back offers, Go to
            disclaimer for more details and get paychecks up to two days early.
            Get a
            <Text
              as="span"
              color="text.currencyColor"
              paddingInline={1}
              fontWeight="bold"
              fontSize="sm"
            >
              $20
            </Text>
            bonus when you receive qualifying direct deposits
          </Text>
        </Box>
      </Flex>
    )
  );
};

const Benefit = memo(BenefitComponent);

export default Benefit;
