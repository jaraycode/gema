import { BaseModel, DepartmentModelWithPersonnel, NavBarProps, PaginatedData } from '..';

export interface PivotDepartmentPersonel {
    begin_date: Date;
    end_date?: Date;
    department_id: number;
    personel_id: number;
}

export interface PersonnelModel extends BaseModel {
    id: number;
    first_name: string;
    second_name?: string;
    last_name: string;
    second_last_name?: string;
    username: string;
    email: string;
    phone_number: string;
    avatar: string;
    department: DepartmentModelWithPersonnel[];
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
