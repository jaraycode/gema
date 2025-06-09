import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type NavSecondary = Omit<NavItem, 'isActive'>;

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    // TODO: Change type with personel schema
    id: number;
    name: string;
    email: string;
    phone_number: string;
    avatar: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface NavUserProps {
    user: Pick<User, 'name' | 'email' | 'avatar'>;
}

export interface NavBarProps {
    user: User;
    navMain: NavMain[];
    navSecondary: NavSecondary[];
}

export interface LocationModel {
    name: string;
    code: string;
    level: number;
}

export interface Links {
    url: string;
    label: string;
    active: bool;
}

export interface PaginatedData<T> {
    data: T[];
    to: number;
    links: Links[];
    total: number;
    from: number;
    last_page: number;
    per_page: number;
    current_page: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface LocationProps extends NavBarProps {
    data: PaginatedData<LocationModel>;
}

export type Equipment = {
    id: string;
    date: string;
    name: string;
};
