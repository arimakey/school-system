export interface Guardian {
  _id?: string;
  dni: string;
  name: string;
  last_name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  occupation?: string;
  isActive: boolean;
  gender?: "male" | "female" | "other";
  createdAt: string;
  updatedAt: string;
}
