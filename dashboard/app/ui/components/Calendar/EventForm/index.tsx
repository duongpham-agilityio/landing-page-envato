'use client';

// Libs
import { memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, VStack } from '@chakra-ui/react';

// Interfaces
import { TEvent } from '@/lib/interfaces';

// Constants
import { EVENT_SCHEMA } from '@/lib/constants';

// Components
import InputField from '@/ui/components/common/InputField';

interface TEventForm extends TEvent {
  date: string;
}

interface AddEventFormProps {
  _id?: string;
  eventName?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  onCloseModal: () => void;
  onAddEvent?: (data: Omit<TEvent, '_id'>) => void;
  onEditEvent?: (data: TEvent) => void;
}

const EventFormComponent = ({
  _id = '',
  eventName = '',
  date = '',
  startTime = '',
  endTime = '',
  onCloseModal,
  onAddEvent,
  onEditEvent,
}: AddEventFormProps) => {
  const {
    control,
    clearErrors,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<TEventForm>({
    defaultValues: {
      _id: _id,
      eventName: eventName,
      startTime: startTime,
      endTime: endTime,
      date: date,
    },
  });

  const isEnable = isDirty && isValid;

  const handleChangeValue = useCallback(
    <T,>(field: keyof TEventForm, changeHandler: (value: T) => void) =>
      (data: T) => {
        clearErrors(field);
        changeHandler(data);
      },
    [clearErrors],
  );

  const handleSubmitForm = useCallback(
    (data: TEventForm) => {
      const requestData = {
        _id: data._id,
        eventName: data.eventName,
        startTime: `${data.date} ${data.startTime}`,
        endTime: `${data.date} ${data.endTime}`,
      };

      !data._id
        ? onAddEvent && onAddEvent(requestData)
        : onEditEvent && onEditEvent(requestData);

      reset(requestData);
      onCloseModal();
    },
    [onAddEvent, onCloseModal, onEditEvent, reset],
  );

  return (
    <VStack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <Flex w="100%" mb={5}>
        <Controller
          control={control}
          name="eventName"
          rules={EVENT_SCHEMA.TITLE}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <InputField
              {...rest}
              label="Title"
              variant="authentication"
              bg="background.body.primary"
              isError={!!error}
              errorMessages={error?.message}
              onChange={handleChangeValue('eventName', onChange)}
            />
          )}
        />
      </Flex>

      <Flex w="100%" mb={5}>
        <Controller
          control={control}
          name="date"
          rules={EVENT_SCHEMA.DATE}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <InputField
              {...rest}
              label="Date"
              type="date"
              variant="authentication"
              bg="background.body.primary"
              isError={!!error}
              errorMessages={error?.message}
              onChange={handleChangeValue('date', onChange)}
            />
          )}
        />
      </Flex>

      <Flex w="100%" flexDirection={{ base: 'column', md: 'row' }}>
        <Flex w="100%" mb={5}>
          <Controller
            control={control}
            name="startTime"
            rules={EVENT_SCHEMA.START_TIME}
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <InputField
                {...rest}
                label="Start"
                type="time"
                variant="authentication"
                bg="background.body.primary"
                mr={{ md: 2 }}
                isError={!!error}
                errorMessages={error?.message}
                onChange={handleChangeValue('startTime', onChange)}
              />
            )}
          />
        </Flex>
        <Flex w="100%" mb={5}>
          <Controller
            control={control}
            name="endTime"
            rules={EVENT_SCHEMA.END_TIME}
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <InputField
                label="End"
                type="time"
                variant="authentication"
                bg="background.body.primary"
                {...rest}
                isError={!!error}
                errorMessages={error?.message}
                onChange={handleChangeValue('endTime', onChange)}
              />
            )}
          />
        </Flex>
      </Flex>

      <Flex my={4}>
        <Button
          type="submit"
          w={44}
          bg="green.600"
          mr={3}
          isDisabled={!isEnable}
        >
          Save
        </Button>
        <Button
          w={44}
          bg="orange.300"
          _hover={{ bg: 'orange.400' }}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </Flex>
    </VStack>
  );
};

const EventForm = memo(EventFormComponent);
export default EventForm;
