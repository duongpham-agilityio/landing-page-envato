'use client';

import {
  Calendar as BigCalendar,
  momentLocalizer,
  CalendarProps,
} from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = (props: Omit<CalendarProps, 'localizer'>) => (
  <div className="myCustomHeight">
    <BigCalendar
      {...props}
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
);

export default MyCalendar;
