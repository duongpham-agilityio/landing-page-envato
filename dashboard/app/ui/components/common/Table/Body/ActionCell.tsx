'use client';

import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { Dot, Modal } from '@/ui/components';

const TransactionModal = dynamic(
  () => import('@/ui/components/common/Table/Body/TransactionModal'),
);

// Interfaces
import { TTransaction, TUserDetail } from '@/lib/interfaces';

interface ActionCallProps {
  user?: TUserDetail;
  transaction?: TTransaction;
  isOpenModal?: boolean;
  isOpenUserAction?: boolean;
  onDeleteTransaction?: (transactionData: TTransaction) => void;
  onUpdateTransaction?: (transactionData: TTransaction) => void;
  onLockUser?: (userData?: TUserDetail) => void;
  onUnlockUser?: (userData?: TUserDetail) => void;
}

const ActionCellComponent = ({
  user,
  transaction,
  isOpenModal = false,
  isOpenUserAction = false,
  onLockUser = () => {},
  onUnlockUser = () => {},
  onDeleteTransaction = () => {},
  onUpdateTransaction = () => {},
}: ActionCallProps) => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const customerId = transaction?.customer.customerId;

  const handleOpenConfirmModal = useCallback(
    (isDeleteModal: boolean) => () => {
      setIsOpenConfirmModal(true);
      setIsDelete(isDeleteModal);
    },
    [],
  );

  const handleToggleModal = useCallback(() => {
    setIsOpenConfirmModal(!isOpenConfirmModal);
  }, [isOpenConfirmModal]);

  const handleDeleteTransaction = useCallback(() => {
    handleToggleModal();
    onDeleteTransaction(transaction as TTransaction);
  }, [handleToggleModal, onDeleteTransaction, transaction]);

  const handleLockUser = useCallback(
    () => onLockUser(user),
    [onLockUser, user],
  );

  const handleUnLockUser = useCallback(
    () => onUnlockUser(user),
    [onUnlockUser, user],
  );

  return (
    <>
      <Td
        px={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="center"
        position="relative"
      >
        <Menu closeOnSelect={false}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                isActive={isOpen}
                p={0}
                bg="none"
                _hover={{
                  bg: 'none',
                }}
                _active={{
                  bg: 'none',
                }}
              >
                <IconButton
                  aria-label="This is the icon action"
                  w={7}
                  h={7}
                  bgColor="transparent"
                  _hover={{
                    bgColor: 'transparent',
                  }}
                  data-testid="dot-icon"
                >
                  <Dot />
                </IconButton>
              </MenuButton>
              {isOpenModal && (
                <MenuList border="none" mt="-2.5" bg="transparent" minW={65}>
                  <MenuItem bg="transparent">
                    <Flex
                      position="absolute"
                      right={4}
                      minW={12}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {isOpenUserAction ? (
                        <>
                          {user?.isBlock ? (
                            <UnlockIcon
                              ml={3}
                              w={5}
                              h={5}
                              onClick={handleUnLockUser}
                              data-testid="lock-unlock-icon"
                            />
                          ) : (
                            <LockIcon
                              ml={3}
                              w={5}
                              h={5}
                              onClick={handleLockUser}
                              data-testid="lock-unlock-icon"
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {!customerId && (
                            <EditIcon
                              w={5}
                              h={5}
                              onClick={handleOpenConfirmModal(false)}
                            />
                          )}
                          <DeleteIcon
                            ml={customerId ? 4 : 0}
                            w={5}
                            h={5}
                            onClick={handleOpenConfirmModal(true)}
                          />
                        </>
                      )}
                    </Flex>
                  </MenuItem>
                </MenuList>
              )}
            </>
          )}
        </Menu>
      </Td>
      {isOpenConfirmModal && transaction && (
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleToggleModal}
          title={isDelete ? 'Delete transaction' : 'Update transaction'}
          body={
            <TransactionModal
              isDelete={isDelete}
              transaction={transaction}
              onDeleteTransaction={handleDeleteTransaction}
              onUpdateTransaction={onUpdateTransaction}
              onCloseModal={handleToggleModal}
            />
          }
          haveCloseButton
        />
      )}
    </>
  );
};

const ActionCell = memo(ActionCellComponent);

export default ActionCell;
