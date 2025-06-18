import { NavBarProps, PaginatedData } from '..';

export interface LocationModel {
    id: number;
    name: string;
    code: string;
    level: number | string;
}

export type TechnicalLocationModel = Omit<LocationModel, 'name' | 'level'>;

export interface TechnicalLocationObject {
    module: LocationModel[];
    floor: LocationModel[];
    area: LocationModel[];
    equipment: LocationModel[];
}

export interface LocationProps extends NavBarProps {
    data: PaginatedData<LocationModel>;
}

export interface TechnicalLocationProps extends NavBarProps {
    data: TechnicalLocationObject;
}

export interface TechnicalLocationPaginatedProps extends NavBarProps {
    data: PaginatedData<TechnicalLocationModel>;
}

export interface EditLocationProps extends NavBarProps {
    data: LocationModel;
}

export type LocationFormData = Omit<LocationModel, 'id'>;

export interface TechnicalLocationFormData {
    level1: number | string;
    level2: number | string;
    level3: number | string;
    level4: number | string;
    level5: number | string;
    level6: number | string;
    level7: number | string;
}
