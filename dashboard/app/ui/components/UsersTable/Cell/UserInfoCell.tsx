import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import { Box, Flex, Td, Text, Tooltip } from '@chakra-ui/react';

// Utils
import { generatePlaceholder } from '@/lib/utils';
import { ImageProps } from '@chakra-ui/next-js';

type TUserInfoProps = Pick<ImageProps, 'loading' | 'priority'> & {
  name: string;
  imageURL: string;
  email: string;
};

const UserInfoComponent = ({
  imageURL,
  name,
  email,
  ...imageProps
}: TUserInfoProps): JSX.Element => (
  <Td
    py={5}
    px={4}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    minW={{ base: 470, xl: 270 }}
  >
    <Flex alignItems="center" gap="10px">
      <Box w={16} h={16} pos="relative" borderRadius={8} overflow="hidden">
        <Image
          src={`${imageURL}`}
          alt={`Image of ${name}`}
          fill
          sizes="100vw"
          blurDataURL={generatePlaceholder(16, 16)}
          placeholder="blur"
          quality={60}
          objectFit="cover"
          {...imageProps}
        />
      </Box>
      <Box flex={1}>
        <Tooltip minW="max-content" placement="bottom-start" label={name}>
          <Text
            as="h4"
            fontSize="lg"
            fontWeight="bold"
            whiteSpace="break-spaces"
            maxW={300}
            noOfLines={1}
          >
            {name}
          </Text>
        </Tooltip>
        <Text
          fontSize="md"
          color="text.textInfo"
          fontWeight="semibold"
          lineHeight={8}
          display="flex"
        >
          <Tooltip
            minW="max-content"
            placement="bottom-start"
            label={`${email}`}
          >
            <Link href={`mailto:${email}`}>
              <Text
                as="span"
                fontSize="sm"
                fontWeight="medium"
                color="secondary.350"
                flex={1}
                whiteSpace="break-spaces"
                noOfLines={1}
              >
                {email}
              </Text>
            </Link>
          </Tooltip>
        </Text>
      </Box>
    </Flex>
  </Td>
);

const UserInfoCell = memo(UserInfoComponent);

export default UserInfoCell;
