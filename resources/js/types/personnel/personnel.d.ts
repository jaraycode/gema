import { BaseModel, NavBarProps, PaginatedData } from '..';

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
}

export interface PersonnelTableProps {
    data: PersonnelModel[];
}

export interface PersonelProps extends NavBarProps {
    personels: PaginatedData<PersonnelModel>;
}

export type DateRange = {
    startDate: string;
    endDate: string;
};
