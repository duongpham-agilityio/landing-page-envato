'use client';

// Libs
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState, memo } from 'react';
import { CloseButton, Flex, Heading } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Calendar as BigCalendar,
  dayjsLocalizer,
  Views,
  SlotInfo,
  CalendarProps as BigCalendarProps,
  Event,
} from 'react-big-calendar';
import isEqual from 'react-fast-compare';
import dayjs from 'dayjs';

// Components
import {
  CustomToolBar,
  EventForm,
  EventDetails,
  ConfirmDeleteModal as ConfirmDeleteModalBody,
  Indicator,
} from '@/ui/components';

// Types
import { TEvent } from '@/lib/interfaces';

// Constants
import {
  DATE_FORMAT,
  MONTH_DATE_FORMAT,
  TIME_FORMAT_12H,
  TIME_FORMAT_HH_MM,
} from '@/lib/constants';

// Themes
import { useColorfill } from '@/ui/themes/bases/colors';

// Lazy loading components
const Modal = dynamic(() => import('@/ui/components/common/Modal'));

// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

interface Slot {
  start: Date;
  end: Date;
}

const localizer = dayjsLocalizer(dayjs);

type CalendarProps = Omit<BigCalendarProps, 'localizer'> & {
  events: (Event & Pick<TEvent, '_id'>)[];
  isLoading?: boolean;
  onAddEvent: (data: Omit<TEvent, '_id'>) => void;
  onEditEvent: (data: TEvent) => void;
  onDeleteEvent: (id: string) => void;
  onSetDate: (date: Date) => void;
};

const Calendar = ({
  events,
  date,
  isLoading = false,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onSetDate,
  ...rest
}: CalendarProps) => {
  const [view, setView] = useState<ViewType>(Views.MONTH);
  const [isAddEvent, setIsAddEvent] = useState(true);
  const [isOpenEventFormModal, setIsOpenEventFormModal] = useState(false);
  const [isOpenEventDetailModal, setIsOpenEventDetailModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [slot, setSlot] = useState<Slot>();
  const [selectedEvent, setSelectedEvent] = useState<Event & Partial<TEvent>>();

  const { septenary } = useColorfill();

  const {
    _id: selectedEventId = '',
    start: selectedEventStart = '',
    end: selectedEventEnd = '',
    title = '',
  } = selectedEvent || {};
  const selectedEventTitle = title?.toString() || '';

  const { start: startSlot = '', end: endSlot = '' } = slot || {};

  const formattedSelectedEventDate = useMemo(
    () => dayjs(selectedEventStart).format(MONTH_DATE_FORMAT),
    [selectedEventStart],
  );

  const formattedSelectedEventStart = useMemo(
    () => dayjs(selectedEventStart).format(TIME_FORMAT_12H),
    [selectedEventStart],
  );

  const formattedSelectedEventEnd = useMemo(
    () => dayjs(selectedEventEnd).format(TIME_FORMAT_12H),
    [selectedEventEnd],
  );

  const selectedEventTime = useMemo(
    () =>
      `${formattedSelectedEventDate} ${formattedSelectedEventStart} – ${formattedSelectedEventEnd}`,
    [
      formattedSelectedEventDate,
      formattedSelectedEventEnd,
      formattedSelectedEventStart,
    ],
  );

  const startEvent = useMemo(
    () => (isAddEvent ? startSlot : selectedEventStart),
    [isAddEvent, selectedEventStart, startSlot],
  );

  const endEvent = useMemo(
    () => (isAddEvent ? endSlot : selectedEventEnd),
    [endSlot, isAddEvent, selectedEventEnd],
  );

  const eventDate = useMemo(
    () => dayjs(startEvent).format(DATE_FORMAT),
    [startEvent],
  );

  const eventStartTime = useMemo(
    () => dayjs(startEvent).format(TIME_FORMAT_HH_MM),
    [startEvent],
  );

  const eventEndTime = useMemo(
    () => dayjs(endEvent).format(TIME_FORMAT_HH_MM),
    [endEvent],
  );

  const handleToggleEventDetailsModal = useCallback(
    () => setIsOpenEventDetailModal((prev) => !prev),
    [],
  );

  const handleToggleEventFormModal = useCallback(() => {
    setIsOpenEventDetailModal(false);
    setIsOpenEventFormModal((prev) => !prev);
  }, []);

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setIsAddEvent(true);
      setSlot((prev) => ({
        ...prev,
        start: slotInfo.start,
        end: slotInfo.end,
      }));

      setIsOpenEventDetailModal(false);
      handleToggleEventFormModal();
    },
    [handleToggleEventFormModal],
  );

  const handleSelectEvent = useCallback((event: Event) => {
    setIsAddEvent(false);
    setSelectedEvent(event);
    setIsOpenEventDetailModal(true);
  }, []);

  const handleToggleConfirmModal = useCallback(() => {
    setIsOpenEventDetailModal(false);
    setIsOpenConfirmModal((prev) => !prev);
  }, []);

  const handleDeleteEvent = useCallback(() => {
    onDeleteEvent(selectedEventId);
    handleToggleConfirmModal();
  }, [handleToggleConfirmModal, onDeleteEvent, selectedEventId]);

  const eventDetailsModalsHeader = useMemo(
    () => (
      <Flex flex={1} justifyContent="space-between" alignItems="center">
        <Heading fontWeight="semibold">Event Details</Heading>
        <Flex flex={1} justifyContent="flex-end" alignItems="center" gap={3}>
          <EditIcon
            color={septenary}
            w={5}
            h={5}
            onClick={handleToggleEventFormModal}
            style={{ cursor: 'pointer' }}
            data-testid="edit-icon"
          />
          <DeleteIcon
            color={septenary}
            w={5}
            h={5}
            onClick={handleToggleConfirmModal}
            style={{ cursor: 'pointer' }}
            data-testid="delete-icon"
          />
          <CloseButton
            color={septenary}
            size="lg"
            onClick={handleToggleEventDetailsModal}
            style={{ cursor: 'pointer' }}
            data-testid="close-icon"
          />
        </Flex>
      </Flex>
    ),
    [
      handleToggleConfirmModal,
      handleToggleEventDetailsModal,
      handleToggleEventFormModal,
      septenary,
    ],
  );

  return (
    <Indicator isOpen={isLoading}>
      <BigCalendar
        {...rest}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={onSetDate}
        defaultView={Views.MONTH}
        view={view}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onView={setView}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{ toolbar: CustomToolBar }}
        selectable
      />
      {isOpenEventFormModal && (
        <Modal
          isOpen={isOpenEventFormModal}
          onClose={handleToggleEventFormModal}
          title={`${isAddEvent ? 'Add' : 'Update'} Event`}
          body={
            <EventForm
              onCancel={handleToggleEventFormModal}
              id={!isAddEvent ? selectedEventId : ''}
              eventName={!isAddEvent ? selectedEventTitle : ''}
              date={eventDate}
              startTime={eventStartTime}
              endTime={eventEndTime}
              onAddEvent={onAddEvent}
              onEditEvent={onEditEvent}
            />
          }
          haveCloseButton
        />
      )}

      {isOpenEventDetailModal && (
        <Modal
          isOpen={isOpenEventDetailModal}
          onClose={handleToggleEventDetailsModal}
          title={eventDetailsModalsHeader}
          body={
            <EventDetails title={selectedEventTitle} time={selectedEventTime} />
          }
          haveCloseButton={false}
        />
      )}

      {isOpenConfirmModal && (
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleToggleConfirmModal}
          title="Delete Event"
          body={
            <ConfirmDeleteModalBody
              itemName={selectedEventTitle}
              onDeleteProduct={handleDeleteEvent}
              onCloseModal={handleToggleConfirmModal}
            />
          }
          haveCloseButton
        />
      )}
    </Indicator>
  );
};

const CalendarMemorized = memo(Calendar, isEqual);

export default CalendarMemorized;
