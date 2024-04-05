import { memo } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: JSX.Element;
  haveCloseButton?: boolean;
};

const ModalComponent = ({
  isOpen,
  onClose,
  body,
  title = '',
  haveCloseButton = false,
}: TModalProps) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent minW={320} maxW="fit-content">
      <ModalHeader
        display="flex"
        justifyContent={haveCloseButton ? 'space-between' : 'center'}
        alignItems="center"
        w="full"
      >
        {title}
        {haveCloseButton && <ModalCloseButton position="unset" size="sm" />}
      </ModalHeader>
      {!!body && <ModalBody>{body}</ModalBody>}
    </ModalContent>
  </Modal>
);

const CustomModal = memo(ModalComponent);
export default CustomModal;
