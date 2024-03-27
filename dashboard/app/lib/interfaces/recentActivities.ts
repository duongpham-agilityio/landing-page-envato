export type TRecentActivities = {
  _id: string;
  actionName: string;
  email: string;
  createdAt: string;
};

export interface TActivitiesRequest {
  _id: string;
  actionName: string;
  email: string;
  createdAt?: string;
  currentPage?: number;
  limit?: number;
}
