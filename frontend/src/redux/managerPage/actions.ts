import { StaffInfo } from "./state";

export function loadStaffDetail(staffInfo: StaffInfo[]) {
    return ({
        type: "@@staff/LOADSTAFFS" as "@@staff/LOADSTAFFS",
        staff: staffInfo
    })
}

type StaffActions = typeof loadStaffDetail

export type IStaffActions = ReturnType<StaffActions>