import { createStore, combineReducers, applyMiddleware } from 'redux'
import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import logger from 'redux-logger';
import './debugger'
import { composeEnhancers, history } from './debugger';
import thunk, { ThunkDispatch } from 'redux-thunk';

//要import唔同components既action同埋reducer，咁樣先可以compose埋一個IRootAction以及一個IRootReducer
import { IAuthActions } from './login/actions'
import { IAuthState } from './login/state';
import { authReducer } from './login/reducer';

import { IClientCardState } from './clientCentre/state';
import { IClientCards } from './clientCentre/actions';
import clientCardReducer from './clientCentre/reducer';

import { ISideBarState } from './sidebar/state';
import { ISideBarActions } from './sidebar/action';
import sideBarReducer from './sidebar/reducer';

import { IBasicInfoState } from './basicInfo/state';
import { IBasicInfoActions } from './basicInfo/actions';
import basicInfoReducer from './basicInfo/reducer';
import { IContractState } from './contract/state';
import { contractReducer } from './contract/reducer';
import { IContractActions } from './contract/actions';
import { medicineReducer } from './medicine/reducer';
import { IMedicineActions } from './medicine/action';
import { IElderlyIndividualDrugRecordsState } from './packMedicine/state';
import { individualMedicineReducer } from './packMedicine/reducer';
import { IPerMedicineActions } from './packMedicine/action';
import { IClientState } from './temperatureRecord/state';
import { clientReducer } from './temperatureRecord/reducer';
import { IClientActions } from './temperatureRecord/actions';
import { IElderlyDrugRecordsState } from './medicine/state';

import medDeliverReducer from './medDeliver/reducer';
import { IMedDeliverState } from './medDeliver/state';
import { IMedDeliverActions } from './medDeliver/actions';
import { IStaffState } from './managerPage/state';
import { staffReducer } from './managerPage/reducer';
import { IStaffActions } from './managerPage/actions';

import { IDrugListState } from './drugList/state';
import { drugListReducer } from './drugList/reducer';
import { IDrugListActions } from './drugList/actions';



export interface IRootState {
    auth: IAuthState;
    clientcard: IClientCardState;
    sidebar: ISideBarState;
    drugList: IDrugListState,
    basicInfo: IBasicInfoState;
    contract: IContractState,
    medicine: IElderlyDrugRecordsState;
    individualMedicine: IElderlyIndividualDrugRecordsState;
    medDeliverInfo: IMedDeliverState;
    router: RouterState;
    client: IClientState;
    staff: IStaffState;
}

export type IRootAction = IAuthActions | IClientCards | ISideBarActions 
                        | IBasicInfoActions | IMedicineActions | IPerMedicineActions 
                        | IContractActions |IMedDeliverActions | IDrugListActions
                        | IClientActions | IStaffActions | CallHistoryMethodAction

export type ThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>;

const rootReducer = combineReducers<IRootState>({
    auth: authReducer,
    clientcard: clientCardReducer,
    sidebar: sideBarReducer,
    drugList: drugListReducer,
    basicInfo: basicInfoReducer,
    medDeliverInfo:medDeliverReducer,
    individualMedicine: individualMedicineReducer,
    contract: contractReducer,
    medicine: medicineReducer,
    client: clientReducer,
    staff: staffReducer,
    router: connectRouter(history)
})


export default createStore<IRootState, IRootAction, {}, {}>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
)