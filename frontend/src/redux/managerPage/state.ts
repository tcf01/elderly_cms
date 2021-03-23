export interface StaffInfo {
    name: string,
    username: string,
    password: number,
    role_id: number,
    isActive: boolean,
}

export interface IStaffState {
    staff: StaffInfo[]
}