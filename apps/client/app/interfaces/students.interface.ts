export interface Student {
  _id?: string;
  code: string;
  name: string;
  last_name: string;
  dni: string;
  email: string;
  birthdate: Date;
  address?: string;
  phoneNumber?: string;
  enrollmentDate: Date;
  gender?: "male" | "female" | "other";
  image?: string;
}
