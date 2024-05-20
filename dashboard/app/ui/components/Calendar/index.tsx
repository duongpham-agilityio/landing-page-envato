'use client';

// Libs
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState, memo } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  SlotInfo,
  CalendarProps as BigCalendarProps,
  Event,
} from 'react-big-calendar';
import isEqual from 'react-fast-compare';
import moment from 'moment';

// Components
import { CustomToolBar, EventForm, EventDetails } from '@/ui/components';

// Types
import { TEvent } from '@/lib/interfaces';

// Constants
import {
  DATE_FORMAT,
  MONTH_DATE_FORMAT,
  TIME_FORMAT_12H,
  TIME_FORMAT_HH_MM,
} from '@/lib/constants';

// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Lazy loading components
const Modal = dynamic(() => import('@/ui/components/common/Modal'));

type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

interface Slot {
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

type CalendarProps = Omit<BigCalendarProps, 'localizer'> & {
  onAddEvent?: (data: Omit<TEvent, '_id'>) => void;
  onEditEvent?: (data: TEvent) => void;
  onDeleteEvent?: (id: string) => void;
};

const CalendarComponent = ({
  events = [],
  onAddEvent,
  onEditEvent,
  ...rest
}: CalendarProps) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<ViewType>(Views.MONTH);
  const [isAddEvent, setIsAddEvent] = useState(true);
  const [isOpenEventFormModal, setIsOpenEventFormModal] = useState(false);
  const [isOpenEventDetailModal, setIsOpenEventDetailModal] = useState(false);
  const [slot, setSlot] = useState<Slot>();
  const [selectedEvent, setSelectedEvent] = useState<Event & Partial<TEvent>>();

  const {
    _id: selectedEventId = '',
    start: selectedEventStart = '',
    end: selectedEventEnd = '',
    eventName: selectedEventTitle = '',
  } = selectedEvent || {};
  const { start: startSlot = '', end: endSlot = '' } = slot || {};

  const formattedSelectedEventDate = useMemo(
    () => moment(selectedEventStart).format(MONTH_DATE_FORMAT),
    [selectedEventStart],
  );

  const formattedSelectedEventStart = useMemo(
    () => moment(selectedEventStart).format(TIME_FORMAT_12H),
    [selectedEventStart],
  );

  const formattedSelectedEventEnd = useMemo(
    () => moment(selectedEventEnd).format(TIME_FORMAT_12H),
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

  const eventDate = useMemo(
    () =>
      moment(isAddEvent ? startSlot : selectedEventStart).format(DATE_FORMAT),
    [isAddEvent, selectedEventStart, startSlot],
  );

  const eventStartTime = useMemo(
    () =>
      moment(isAddEvent ? startSlot : selectedEventStart).format(
        TIME_FORMAT_HH_MM,
      ),
    [isAddEvent, selectedEventStart, startSlot],
  );

  const eventEndTime = useMemo(
    () =>
      moment(isAddEvent ? endSlot : selectedEventEnd).format(TIME_FORMAT_HH_MM),
    [endSlot, isAddEvent, selectedEventEnd],
  );

  const handleToggleEventDetailsModal = useCallback(
    () => setIsOpenEventDetailModal((prev) => !prev),
    [],
  );

  const handleToggleEventFormModal = useCallback(() => {
    setIsOpenEventDetailModal(false);
    setIsOpenEventFormModal((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );

  const handleView = useCallback(
    (newView: ViewType) => setView(newView),
    [setView],
  );

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

  return (
    <>
      <BigCalendar
        {...rest}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '50vh' }}
        date={date}
        onNavigate={handleNavigate}
        defaultView={Views.MONTH}
        view={view}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onView={handleView}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{ toolbar: CustomToolBar }}
        selectable
      />
      {isOpenEventFormModal && (
        <Modal
          isOpen={isOpenEventFormModal}
          onClose={handleToggleEventFormModal}
          title={isAddEvent ? 'Add Event' : 'Update Event'}
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
          title="Event Information"
          body={
            <EventDetails
              id={selectedEventId}
              title={selectedEventTitle}
              time={selectedEventTime}
              onEdit={handleToggleEventFormModal}
              onCancel={handleToggleEventDetailsModal}
            />
          }
          haveCloseButton
        />
      )}
    </>
  );
};

const Calendar = memo(CalendarComponent, isEqual);

export default Calendar;
