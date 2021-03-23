import { ClientInfo } from "./state"

export function loadClient(clientInfo: ClientInfo[]) {
    return ({
        type: "@@client/LOADCLIENTS" as "@@client/LOADCLIENTS",
        client: clientInfo
    })
}

type ClientActions = typeof loadClient

export type IClientActions = ReturnType<ClientActions>