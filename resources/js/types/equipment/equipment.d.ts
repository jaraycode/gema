import { NavBarProps, PaginatedData } from '..';

export interface EquipmentnModel {
    id: number;
    name: string;
    code: string;
    level: number | string;
}

export interface EquipmentnProps extends NavBarProps {
    data: PaginatedData<EquipmentnModel>;
}

export type EquipmentnFormData = Omit<EquipmentnModel, 'id'>;
