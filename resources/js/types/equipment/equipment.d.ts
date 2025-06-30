import { LocationEquipmentProps, NavBarProps, PaginatedData, TechnicalLocationModel, TechnicalLocationObject } from '..';

export interface EquipmentnModel {
    id: number;
    name: string;
    code: string;
    level: number | string;
}

export interface EquipmentnProps extends NavBarProps {
    data: PaginatedData<EquipmentnModel>;
}

export interface EquipmentFormProps extends NavBarProps {
    equipment_type: LocationEquipmentProps[];
    locations: TechnicalLocationObject;
    technical_locations: TechnicalLocationModel[];
}

export type EquipmentnFormData = Omit<EquipmentnModel, 'id'>;
