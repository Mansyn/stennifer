
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
    uid: string;
    user_uid: string;
    mailing: boolean;
    name: string;
    phoneNumber: string;
}

export interface UserProfile {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    roles: Roles;
    profile: Profile;
}
