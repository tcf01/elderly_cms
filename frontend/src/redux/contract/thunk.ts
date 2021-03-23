import { Dispatch } from "redux";
import { loadContract, IContractActions } from "./actions"

const { REACT_APP_API_SERVER } = process.env

export function remoteLoadContract() {
    return async (dispatch: Dispatch<IContractActions>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/contract/`, {

            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const json = await res.json()
        dispatch(loadContract(json))
    }
}