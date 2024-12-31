export interface RegistrationProcess {
    _id: string;
    name: string;
    description?: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
}
