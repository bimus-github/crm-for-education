export enum ROLE {
  ADMIN,
  TEACHER,
  STUDENT,
}

export type User = {
  id: string;
  school: string;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  phone: string;
  role: ROLE;
  img: string;
  languages?: Language[];
  sale?: string;
  teacher?: string;
  group?: string;
  startedTime: string;
};

export type School = {
  id: string;
  logo: string;
  name: string;
  teachers: string[];
  admins: string[];
};

export type Language = "en" | "uz" | "ru";

export type Days = "Mon" | "Tue" | "Wed" | "Thurs" | "Fri" | "Sat" | "Sun";

export type Subjects =
  | "Mathematics"
  | "Physics"
  | "Academic English"
  | "Russian"
  | "Ona-tili"
  | "Adabiyot"
  | "Chemistry"
  | "Biology"
  | "Mental Math"
  | "IELTS"
  | "Colloquial in Russian"
  | "Hitory"
  | "IQ";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Group = {
  id: string;
  name: string;
  language: {};
  monthlyBill: {};
  startedTime: string;
  school: string;
  teacher: {
    user: string;
    monthlyBillPercentage: string;
  };
  schedule: {
    days: {};
    time: {
      start: string;
      end: string;
    };
  };
};
