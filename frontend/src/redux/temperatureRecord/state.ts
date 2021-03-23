export interface ClientInfo {
    bed_number: number,
    name_chi: string,
    temperature_data?:string,
    temperature_unit?:string
}

export interface IClientState {
    clientName: ClientInfo[] 
}