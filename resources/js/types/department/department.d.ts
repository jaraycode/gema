import { NavBarProps, PaginatedData } from '..';

export interface DepartmentModel {
    id: number;
    name: string;
    code: string;
}

export type DepartmentForm = Omit<DepartmentModel, 'id'>;

export interface DepartmentIndexProps extends NavBarProps {
    data: PaginatedData<DepartmentModel>;
}
