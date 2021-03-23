import { ContractInfo } from "./state";

export function loadContract(contractInfo: ContractInfo){
    return({
        type: "@@contract/LOADCONTRACT" as "@@contract/LOADCONTRACT",
        contract: contractInfo
    })
}

type ContractActions = typeof loadContract

export type IContractActions = ReturnType<ContractActions>