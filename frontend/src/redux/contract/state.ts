export interface BasicContract {
    id: number;
    term: number;
}

export interface ContractInfo {
    basicContract: string,
    additionContract: string,
}

export interface IContractState {
    content: {
        basicContract: string,
        additionContract: string
    },
}