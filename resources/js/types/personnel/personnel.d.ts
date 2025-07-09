import { BaseModel, DepartmentModel, NavBarProps, PaginatedData } from '..';

export interface PersonnelModel extends BaseModel {
    id: number;
    email: string;
    username: string;
    phone_number: string;
    first_name: string;
    second_name: string | null;
    last_name: string;
    second_last_name: string | null;
    avatar: string;
    delete_at: string | null;
    created_at: string;
    updated_at: string;
    departments: string;
    dni: string;
}

export interface PersonnelTableProps {
    data: PersonnelModel[];
}

export interface PersonelProps extends NavBarProps {
    personels: PaginatedData<PersonnelModel>;
}

export interface ProfileInfoProps {
    data: {
        id: number;
        nombre: string;
        cedula: string;
        telefono: string;
        email: string;
        cargo: string;
        departamento: string;
    } | null;
}

export type DateRange = {
    startDate: string;
    endDate: string;
};

export interface PersonnelStoreProps {
    name: string;
    last_name: string;
    department: string;
    dni: string;
    national_status: string;
    password: string;
    email: string;
    national_status: string;
    phone_number: string;
}

export interface PersonnelEditProps {
    id: number;
    first_name: string;
    second_name: string;
    second_last_name: string;
    last_name: string;
    departments: DepartmentModel[];
    dni: string;
    national_status: string;
    password: string;
    email: string;
    national_status: string;
    phone_number: string;
}
