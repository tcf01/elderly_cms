import './IndividualMedicineCard.css'
import * as React from 'react'
import { IRootState, ThunkDispatch } from '../../redux/store';
import { connect } from 'react-redux';
import { getOneClientMedicineRecord, updateDrugStatus } from '../../redux/packMedicine/thunk';
import { withRouter, RouteComponentProps } from 'react-router';
import { IPerMedicineRecordCard } from '../../redux/packMedicine/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';
import { push } from 'connected-react-router';
import FinishModal from '../modal/Modal';
// import { getAllClientMedicineRecord } from '../../redux/medicine/thunk';


interface IElderlyDrugStatus {
    drug_details_id: number,
    status_id: number
}

interface IndividualMedicineCardState {
    id: number;
    drug_detail_status_storage: IElderlyDrugStatus[];
    singleElderlyInfo: IPerMedicineRecordCard;
    header_recent_stage: string;
    allChecked: boolean,
    url: string,
    modalIsOpen: boolean
}

export interface IIndividualMedicineCardProps {
    elderlyIndividualDrugRecord: IPerMedicineRecordCard;
    getIndividualDrugRecord: (id: number) => void
    changeDrugRecentStage: (drugDetailId: number, drugRecentStage: number) => void
    // toNextPage: (path: string) => void,
    // toDeliverPage: (path: string) => void,
    // getAllElderlyMedicineRecord: () => void
    procedure: number
    toHomePage: () => void

}

class IndividualMedicineCard extends React.Component<IIndividualMedicineCardProps & RouteComponentProps<any>, IndividualMedicineCardState> {

    constructor(props: IIndividualMedicineCardProps & RouteComponentProps<any>) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),
            singleElderlyInfo: {} as IPerMedicineRecordCard,
            drug_detail_status_storage: [],
            header_recent_stage: '',
            allChecked: false,
            modalIsOpen: false,
            url: ""
        }
        console.log("hi,this is the constructor state", this.state)
    }

    public componentDidMount = async () => {
        // await this.props.getAllElderlyMedicineRecord()
        await this.props.getIndividualDrugRecord(this.props.match.params.id)
        console.log('mount完之後會出乜', this.props.elderlyIndividualDrugRecord)
        const elderlyIndividualDrugRecordArray = this.elderlyIndividualDrugRecordArray();
        this.setState({
            singleElderlyInfo: this.props.elderlyIndividualDrugRecord,   //拎到filtered既老人家info
            drug_detail_status_storage: elderlyIndividualDrugRecordArray,
            header_recent_stage: this.stage[this.props.procedure as 2 | 3 | 4]
        }, () => {
            console.log('新component，由componentDidMount提供', this.state)
        })


    }

    private type: string = ''
    private stage = { 1: "執藥", 2: "執藥", 3: "核藥", 4: "派藥" }

    private elderlyIndividualDrugRecordArray = (): IElderlyDrugStatus[] => {
        const filterElderlyResult = this.props.elderlyIndividualDrugRecord
        return filterElderlyResult && filterElderlyResult.drug_basic_info.reduce((acc, drug_basic_info) => {
            return [...acc, ...drug_basic_info.drug_details.map((data) => { return { drug_details_id: data.drug_details_id, status_id: data.status_id } })]
        }, [] as IElderlyDrugStatus[])
    }



    private handleClickDrugCheckBox = async (drugDetailId: number, status_id: number) => {
        await this.props.changeDrugRecentStage(drugDetailId, status_id)
        let changedResult = [];
        let nextStage: number;
        switch (status_id) {
            case 1:
                nextStage = 2
                break
            case 2:
                nextStage = 3
                break
            case 3:
                nextStage = 4
                break
            case 4:
                nextStage = 1
                break
            default:
                nextStage = 1
        }
        changedResult = this.state.drug_detail_status_storage.map((data) => {
            if (data.drug_details_id === drugDetailId) {
                return ({
                    ...data,
                    status_id: nextStage
                })
            }
            return data
        })

        this.setState({
            drug_detail_status_storage: changedResult,
        }, () => {
            this.drugStatusGuard()
        })
    }

    private handleFinishOnClick = () => {
        this.props.toHomePage()
        // const largestUserId = Math.max(...allUsersId)
        // const pathOfRecentStageInEng = `/medicine/${this.pathAndCssStageMarker[this.state.header_recent_stage as "執藥" | "核藥" | "派藥"]}/${this.state.id + 1}`
        // console.log('alluserID係咩', allUsersId)
        // console.log('依家個largestUserId係咩',largestUserId)
        // console.log('依家個pathOfRecentStageInEng係咩',pathOfRecentStageInEng)
        // if (!(this.state.id + 1 > largestUserId)) {
        //     console.log("依家條path係乜野", pathOfRecentStageInEng)
        //     this.props.toNextPage(pathOfRecentStageInEng)
        // } else if (this.state.id + 1 > largestUserId && pathOfRecentStageInEng.search('pack') !== -1) {
        //     this.toggleModal();
        // }else if (this.state.id + 1 > largestUserId && pathOfRecentStageInEng.search('verify') !== -1) {
        //     this.toggleModal();
        // }
    }

    private drugStatusGuard = () => {
        const checkedDrugs = this.state.drug_detail_status_storage.filter((drugDetailStatus) => {
            return drugDetailStatus["status_id"] === this.props.procedure
        })

        //check下兩個係咪相等，係就true，唔係就false
        const allChecked = checkedDrugs.length === this.state.drug_detail_status_storage.length
        console.log('依家係咩狀態', checkedDrugs.length, this.state.drug_detail_status_storage.length, allChecked, this.props.procedure, this.state.drug_detail_status_storage)

        if (allChecked) {
            this.setState({
                allChecked: true
            })
        } else {
            return false
        }
    }

    public toggleModal() {
        // this.setState({
        //     modalIsOpen: !(this.state.modalIsOpen)
        // })
        console.log('呢句係toggleModal入面行既');
    }


    public render = () => {
        const { elderly_chi_name } = this.state.singleElderlyInfo;
        const drug_basic_info = this.state.singleElderlyInfo.drug_basic_info;

        return (
            <div className="individual-wrapper">
                <div className="header" >
                    <h1>{this.state.header_recent_stage} - {elderly_chi_name}的所需藥物 </h1>
                </div>
                {drug_basic_info && drug_basic_info.map((individual_drug_info, index) => {
                    return (
                        <div key={index} className={`individual_drug_info container ${this.type}`} >
                            <div className="row" >
                                <div className="col drug_details">
                                    <div className="col-6">
                                        <img src={individual_drug_info.image} alt="" />
                                    </div>
                                    <div className="drug_time_container col-6">
                                        <div className="col name_dose" >
                                            <span className='drug_name'>藥名： {individual_drug_info.name}</span>
                                            <span className='drug_dose'>劑量：{individual_drug_info.dose}</span>
                                        </div>
                                        <div className="individual_time_section">
                                            <div className="time_text">服用時間：</div>
                                            <div className="drug_individual_time">
                                                {individual_drug_info.drug_details.map((drug_detail, index) => {
                                                    return (
                                                        <div key={index} data-status_id={drug_detail.drug_details_id}
                                                            data-drug_detail_id={drug_detail.drug_details_id} className={"timeAndButton"}>
                                                            <span className="drug_time">{drug_detail.have_drug_time} </span>
                                                            {this.state.drug_detail_status_storage.filter((data) => data.drug_details_id === drug_detail.drug_details_id).find((data) => data.status_id !== this.props.procedure) ? <span className={'checker'} onClick={this.handleClickDrugCheckBox.bind(this, drug_detail.drug_details_id, drug_detail.status_id)}> </span> : <FontAwesomeIcon icon={faCheck} />}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="handling_procedure">
                    <div className="buttons">
                        {/* <Button onClick={this.props.history.goBack}>返回</Button> */}
                        <Button onClick={this.handleFinishOnClick} className={(this.state.allChecked ? "display" : "invisible")}> 完成，下一個院友 </Button>
                        {/* <FinishModal isOpen={this.state.modalIsOpen} className="finishModal"></FinishModal> */}
                        <FinishModal isOpen={this.state.modalIsOpen} className="finishModal" procedure={this.props.procedure} ></FinishModal>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: IRootState) => {
    return {
        elderlyDrugRecords: state.medicine.elderlyDrugRecords,  //全部老人家既info
        elderlyIndividualDrugRecord: state.individualMedicine.elderlyIndividualDrugRecord,
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        // getAllElderlyMedicineRecord: () => dispatch(getAllClientMedicineRecord()),
        getIndividualDrugRecord: (id: number) => dispatch(getOneClientMedicineRecord(id)),
        changeDrugRecentStage: (drugDetailId: number, drugRecentStage: number) => dispatch(updateDrugStatus(drugDetailId, drugRecentStage)),
        // toNextPage: (path: string) => dispatch(push(path)),
        // toDeliverPage: (path: string) => dispatch(push(path)),
        toHomePage: () => dispatch(push('/medicine/pack'))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((IndividualMedicineCard)))
