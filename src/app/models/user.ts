import * as moment from 'moment'

export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    roles: Roles;
}

export interface Profile {
    uid: string
    user_uid: string
    additional: number
    additionalKids: number
    acceptDate: number
    decline: boolean
}

export interface UserProfile {
    uid: string
    displayName: string
    email: string
    phoneNumber: string
    photoURL: string
    roles: Roles
    additional: number
    additionalKids: number
    acceptDate: number
    decline: boolean
}
