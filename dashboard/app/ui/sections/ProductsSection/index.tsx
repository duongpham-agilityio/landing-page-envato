'use client';

import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';
import { useProducts } from '@/lib/hooks';
import { TProductRequest } from '@/lib/interfaces';
import { customToast } from '@/lib/utils';
import { Button, Indicator, Modal } from '@/ui/components';
import { ProductForm } from '@/ui/components/common/Table/Body';
import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { InView } from 'react-intersection-observer';

import dynamic from 'next/dynamic';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

// lazy loading components
const ProductsTable = dynamic(() => import('@/ui/components/ProductsTable'));
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const BoxChat = dynamic(() => import('@/ui/components/BoxChat'));

const ProductsSection = () => {
  const toast = useToast();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { createProduct, isCreateProduct } = useProducts();

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  const handleCreateProduct = useCallback(
    (product: Omit<TProductRequest, 'id'>) => {
      createProduct(
        {
          ...product,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.title,
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [createProduct, toast],
  );

  return (
    <Grid
      bg="background.body.primary"
      py={12}
      px={{ base: 6, xl: 12 }}
      templateColumns={{ base: 'repeat(1, 1fr)', '2xl': 'repeat(4, 1fr)' }}
      display={{ sm: 'block', md: 'grid' }}
      gap={{ base: 0, '2xl': 12 }}
    >
      <GridItem colSpan={3}>
        <Box
          as="section"
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          <Button
            w={200}
            type="button"
            role="button"
            aria-label="Add User"
            colorScheme="primary"
            marginBottom="10px"
            bg="primary.300"
            textTransform="capitalize"
            onClick={handleToggleModal}
          >
            Add User
          </Button>

          <ProductsTable />
        </Box>
      </GridItem>
      <InView>
        {({ inView, ref }) => (
          <GridItem mt={{ base: 6, '2xl': 0 }} ref={ref}>
            <Flex
              direction={{ base: 'column', lg: 'row', xl: 'column' }}
              gap={6}
            >
              {inView && <CardPayment />}
              {inView && <BoxChat />}
            </Flex>
          </GridItem>
        )}
      </InView>

      {isOpenConfirmModal && (
        <Indicator isOpen={isCreateProduct}>
          <Modal
            isOpen={isOpenConfirmModal}
            onClose={handleToggleModal}
            title="Add User"
            body={
              <ProductForm
                onCloseModal={handleToggleModal}
                onCreateProduct={handleCreateProduct}
              />
            }
            haveCloseButton
          />
        </Indicator>
      )}
    </Grid>
  );
};

export default ProductsSection;
