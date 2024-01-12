export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IProject = {
  id: string;
  title: string;
  icon: string;
  desc: string;
  position: number;
  onGoing: boolean;
  onGoingPosition: number;
  createdAt: Date;
  userId: string;
};

export type ISection = {
  id: string;
  title: string;
  createdAt: Date;
  projectId: string;
};

export type ITask = {
  id: string;
  title: string;
  desc: string;
  position: number;
  createdAt: Date;
  sectionId: string;
};
