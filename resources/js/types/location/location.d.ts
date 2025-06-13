import { NavBarProps, PaginatedData } from '..';

export interface LocationModel {
    id: number;
    name: string;
    code: string;
    level: number | string;
}

export interface LocationProps extends NavBarProps {
    data: PaginatedData<LocationModel>;
}

export interface EditLocationProps extends NavBarProps {
    data: LocationModel;
}

export type LocationFormData = Omit<LocationModel, 'id'>;
