import { Student } from "~/routes/__dashboard.students/students-types";

const students: Student[] = [
    {
        code: 'S001',
        name: 'Juan',
        last_name: 'Pérez',
        dni: '12345678',
        email: 'juan.perez@email.com',
        birthdate: new Date('1999-01-15'),
        enrollmentDate: new Date('2023-09-01'),
        isActive: true
    },
    {
        code: 'S002',
        name: 'Ana',
        last_name: 'Gómez',
        dni: '23456789',
        email: 'ana.gomez@email.com',
        birthdate: new Date('2000-02-20'),
        enrollmentDate: new Date('2022-08-15'),
        isActive: true
    },
    {
        code: 'S003',
        name: 'Carlos',
        last_name: 'López',
        dni: '34567890',
        email: 'carlos.lopez@email.com',
        birthdate: new Date('1998-03-10'),
        enrollmentDate: new Date('2021-07-10'),
        isActive: false
    },
    {
        code: 'S004',
        name: 'Laura',
        last_name: 'Martínez',
        dni: '45678901',
        email: 'laura.martinez@email.com',
        birthdate: new Date('2001-04-05'),
        enrollmentDate: new Date('2023-05-01'),
        isActive: true
    },
    {
        code: 'S005',
        name: 'Pedro',
        last_name: 'Ramírez',
        dni: '56789012',
        email: 'pedro.ramirez@email.com',
        birthdate: new Date('1997-05-25'),
        enrollmentDate: new Date('2020-09-01'),
        isActive: true,
        nationality: 'Mexican'
    },
    {
        code: 'S006',
        name: 'Sofía',
        last_name: 'Fernández',
        dni: '67890123',
        email: 'sofia.fernandez@email.com',
        birthdate: new Date('1996-06-30'),
        enrollmentDate: new Date('2021-04-15'),
        isActive: false
    },
    {
        code: 'S007',
        name: 'Miguel',
        last_name: 'Sánchez',
        dni: '78901234',
        email: 'miguel.sanchez@email.com',
        birthdate: new Date('1995-07-18'),
        enrollmentDate: new Date('2022-03-01'),
        isActive: true,
        gender: 'male'
    },
    {
        code: 'S008',
        name: 'Isabel',
        last_name: 'Torres',
        dni: '89012345',
        email: 'isabel.torres@email.com',
        birthdate: new Date('1994-08-12'),
        enrollmentDate: new Date('2021-10-01'),
        isActive: true
    },
    {
        code: 'S009',
        name: 'David',
        last_name: 'Vázquez',
        dni: '90123456',
        email: 'david.vazquez@email.com',
        birthdate: new Date('2002-09-22'),
        enrollmentDate: new Date('2023-06-20'),
        isActive: true,
        nationality: 'Spanish'
    },
    {
        code: 'S010',
        name: 'Paula',
        last_name: 'García',
        dni: '01234567',
        email: 'paula.garcia@email.com',
        birthdate: new Date('1993-10-08'),
        enrollmentDate: new Date('2020-11-25'),
        isActive: false
    }
];

export default students