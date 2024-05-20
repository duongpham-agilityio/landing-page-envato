// Libs
import { useCallback, memo } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface EventDetailProps {
  id: string;
  title: string;
  time: string;
  onEdit: (id: string) => void;
  onCancel: () => void;
}

const EventDetailComponent = ({
  id,
  title,
  time,
  onEdit,
  onCancel,
}: EventDetailProps) => {
  const handleClickEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  // TODO: Update later
  const handleOpenConfirmModal = () => {};

  return (
    <Box minW={{ md: 500 }}>
      <Heading>{title}</Heading>
      <Flex gap={{ base: 4, md: 6 }}>
        <Text>{time}</Text>

        <Flex gap={3}>
          <EditIcon
            w={5}
            h={5}
            onClick={handleClickEdit}
            style={{ cursor: 'pointer' }}
          />
          <DeleteIcon
            w={5}
            h={5}
            onClick={handleOpenConfirmModal}
            style={{ cursor: 'pointer' }}
          />
        </Flex>
      </Flex>

      <Flex mt={6} justifyContent="end">
        <Button
          w={{ base: 120, md: 176 }}
          bg="orange.300"
          _hover={{ bg: 'orange.400' }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

const EventDetail = memo(EventDetailComponent);

export default EventDetail;
