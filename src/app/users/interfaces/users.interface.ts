export interface UsersResponse {
    username: string;
    name:     string;
    email:    string;
    role:     Role;
    img:      null | string;
}

export enum Role {
    AdminRole = "ADMIN_ROLE",
    UserRole = "USER_ROLE",
}
