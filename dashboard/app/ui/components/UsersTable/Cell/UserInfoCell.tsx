import { Box, Flex, Img, Td, Text, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';

type TUserInfoProps = {
  name: string;
  imageURL: string;
  role: string;
  address: string;
  time: string;
};

const UserInfoComponent = ({
  imageURL,
  name,
  address,
  time,
  role,
}: TUserInfoProps): JSX.Element => (
  <Td
    py={5}
    px={4}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    minW={470}
  >
    <Flex alignItems="center" gap="10px">
      <Img
        src={`${imageURL}`}
        alt={`Image of ${name}`}
        w={16}
        h={16}
        borderRadius="lg"
        bgColor="transparent"
        objectFit="cover"
      />
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
          <Tooltip minW="max-content" placement="bottom-start" label={role}>
            <Text
              as="span"
              maxW={230}
              whiteSpace="break-spaces"
              noOfLines={1}
              title={role}
            >
              {role}&sdot;
            </Text>
          </Tooltip>
          <Tooltip
            minW="max-content"
            placement="bottom-start"
            label={`${address} ${time}`}
          >
            <Text
              as="span"
              fontSize="sm"
              fontWeight="medium"
              color="secondary.350"
              flex={1}
              whiteSpace="break-spaces"
              noOfLines={1}
            >
              {address}&sdot;{time}
            </Text>
          </Tooltip>
        </Text>
      </Box>
    </Flex>
  </Td>
);

const UserInfoCell = memo(UserInfoComponent);

export default UserInfoCell;
