import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { Control } from 'react-hook-form';

// Components
import { Modal, PinCode } from '..';

// Types
import { TPinCodeForm } from '@/lib/interfaces';

interface PinCodeModalProps {
  control: Control<TPinCodeForm>;
  title: string;
  isOpen: boolean;
  isDisabled: boolean;
  onclose: () => void;
  onSubmit: () => void;
}

const PinCodeModalComponent = ({
  control,
  title,
  isOpen,
  isDisabled,
  onclose,
  onSubmit,
}: PinCodeModalProps) => {
  const pinCodeModalBody = useMemo(
    () => (
      <PinCode
        control={control}
        isDisabled={isDisabled}
        onSubmit={onSubmit}
        onClose={onclose}
      />
    ),
    [control, isDisabled, onSubmit, onclose],
  );
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onclose}
      body={pinCodeModalBody}
    />
  );
};

const PinCodeModal = memo(PinCodeModalComponent, isEqual);

export default PinCodeModal;
