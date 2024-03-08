'use client';

import { Button, Modal } from '@/ui/components';
import { ProductForm } from '@/ui/components/common/Table/Body';
import { useState } from 'react';

const ProductsSection = () => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  return (
    <>
      <Button
        w={200}
        type="button"
        role="button"
        aria-label="Add User"
        colorScheme="primary"
        bg="primary.300"
        textTransform="capitalize"
        onClick={handleToggleModal}
      >
        Add User
      </Button>

      {isOpenConfirmModal && (
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleToggleModal}
          title="Add User"
          body={<ProductForm onCloseModal={handleToggleModal} />}
          haveCloseButton
        />
      )}
    </>
  );
};
export default ProductsSection;
