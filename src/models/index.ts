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
  about: string;
  phone: string;
  role: ROLE;
  img: string;
};

export type School = {
  id: string;
  logo: string;
  name: string;
  teachers: string[];
};

export type Student = User & {};

export type Language = 'en' | 'uz' | 'ru';

export type Teacher = User & {
  groups: string[];
  languages: Language[];
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
