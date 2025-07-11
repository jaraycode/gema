import { NavBarProps, PaginatedData, TechnicalLocationModel, TechnicalLocationObject } from '..';

export interface EquipmentModel {
    code: string;
    model: string;
    brand: string;
    serial: string;
    type: string;
    description: string;
    technical_location: string;
    status: number;
}

export interface EquipmentProps extends NavBarProps {
    data: PaginatedData<EquipmentModel>;
}

export interface EquipmentFormProps extends NavBarProps {
    equipment_type: string[];
    locations: TechnicalLocationObject;
    technical_locations: TechnicalLocationModel[];
}

export interface EquipmentEditFormProps extends EquipmentFormProps {
    props: EquipmentModel;
}

export type EquipmentnFormData = Omit<EquipmentnModel, 'id'>;

export type EquipmentFormData = Omit<EquipmentModel, 'code'>;
