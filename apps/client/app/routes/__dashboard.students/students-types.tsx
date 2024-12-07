export type Student = {
    code: string;
    name: string;
    last_name: string;
    dni: string;
    email: string;
    birthdate: Date;
    address?: string;
    phoneNumber?: string;
    enrollmentDate: Date;
    isActive: boolean;
    nationality?: string;
    gender?: "male" | "female" | "other";
};
