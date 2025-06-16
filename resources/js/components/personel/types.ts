export type Personel = {
    id: string;
    date: string;
    cedula: string;
    name: string;
    position: string;
    department: string;
    phone: string;
};

export type PersonelTableProps = {
    data: Personel[];
};

export type DateRange = {
    startDate: string;
    endDate: string;
};
