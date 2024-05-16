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
} from 'react-big-calendar';
import isEqual from 'react-fast-compare';
import moment from 'moment';

// Components
import { CustomToolBar, EventForm } from '@/ui/components';

// Types
import { TEvent } from '@/lib/interfaces';

// Constants
import { DATE_FORMAT, TIME_FORMAT_HH_MM } from '@/lib/constants';

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [slot, setSlot] = useState<Slot>();

  const { start: startSlot = '', end: endSlot = '' } = slot || {};

  const slotDate = useMemo(
    () => moment(startSlot).format(DATE_FORMAT),
    [startSlot],
  );

  const slotStartTime = useMemo(
    () => moment(startSlot).format(TIME_FORMAT_HH_MM),
    [startSlot],
  );

  const slotEndTime = useMemo(
    () => moment(endSlot).format(TIME_FORMAT_HH_MM),
    [endSlot],
  );

  const handleToggleModal = useCallback(
    () => setIsOpenModal((prev) => !prev),
    [],
  );

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
      setSlot((prev) => ({
        ...prev,
        start: slotInfo.start,
        end: slotInfo.end,
      }));

      handleToggleModal();
    },
    [handleToggleModal],
  );

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
        components={{ toolbar: CustomToolBar }}
        selectable
      />
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleToggleModal}
          title="Add Event"
          body={
            <EventForm
              onCloseModal={handleToggleModal}
              date={slotDate}
              startTime={slotStartTime}
              endTime={slotEndTime}
              onAddEvent={onAddEvent}
              onEditEvent={onEditEvent}
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
