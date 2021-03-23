export function toggleSideBar(){
    return ({
        type: "@@sidebar/TOGGLE" as "@@sidebar/TOGGLE"
    })
}

type SideBarCreators = typeof toggleSideBar 

export type ISideBarActions = ReturnType<SideBarCreators> 