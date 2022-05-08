export enum ROLE {
  ADMIN,
  TEACHER,
  STUDENT,
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: ROLE;
};

export type School = {
  id: string;
  logo: string;
  name: string;
  teachers: string[];
};

export type Student = User & {};

export type Teacher = User & {
  groups: string[];
  languages: string[];
};

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type Group = {
  id: string;
  name: string;
  language: string;
  monthlyBill: number;
  subject: string;
  teacher: {
    user: string;
    monthlyBillPercentage: string;
  };
  students: string;
  schedule: {
    days: Day[];
    time: {
      start: number;
      end: number;
    };
  };
};
