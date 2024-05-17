export interface TEvent {
  _id: string;
  eventName: string;
  startTime: string;
  endTime: string;
}

export type TEventsResponse = {
  result: (TEvent & { userId: string })[];
  totalPage: number;
};

export type AddEventPayload = Omit<TEvent, '_id'> & {
  userId: string;
};

export type AddEventResponse = TEvent & { userId: string };
