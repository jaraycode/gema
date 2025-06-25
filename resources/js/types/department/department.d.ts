import { BaseModel, NavBarProps, PaginatedData, PivotDepartmentPersonel } from '..';

export interface DepartmentModel extends BaseModel {
    id: number;
    name: string;
    code: string;
}

export interface DepartmentModelWithPersonnel extends DepartmentModel {
    pivot: PivotDepartmentPersonel;
}

export type DepartmentForm = Omit<DepartmentModel, 'id'>;

export interface DepartmentIndexProps extends NavBarProps {
    data: PaginatedData<DepartmentModel>;
}

export interface DepartmentEditProps extends NavBarProps {
    department: DepartmentModel;
}
