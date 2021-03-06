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
        console.log('mount??????????????????', this.props.elderlyIndividualDrugRecord)
        const elderlyIndividualDrugRecordArray = this.elderlyIndividualDrugRecordArray();
        this.setState({
            singleElderlyInfo: this.props.elderlyIndividualDrugRecord,   //??????filtered????????????info
            drug_detail_status_storage: elderlyIndividualDrugRecordArray,
            header_recent_stage: this.stage[this.props.procedure as 2 | 3 | 4]
        }, () => {
            console.log('???component??????componentDidMount??????', this.state)
        })


    }

    private type: string = ''
    private stage = { 1: "??????", 2: "??????", 3: "??????", 4: "??????" }

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
        // const pathOfRecentStageInEng = `/medicine/${this.pathAndCssStageMarker[this.state.header_recent_stage as "??????" | "??????" | "??????"]}/${this.state.id + 1}`
        // console.log('alluserID??????', allUsersId)
        // console.log('?????????largestUserId??????',largestUserId)
        // console.log('?????????pathOfRecentStageInEng??????',pathOfRecentStageInEng)
        // if (!(this.state.id + 1 > largestUserId)) {
        //     console.log("?????????path?????????", pathOfRecentStageInEng)
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

        //check??????????????????????????????true????????????false
        const allChecked = checkedDrugs.length === this.state.drug_detail_status_storage.length
        console.log('??????????????????', checkedDrugs.length, this.state.drug_detail_status_storage.length, allChecked, this.props.procedure, this.state.drug_detail_status_storage)

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
        console.log('?????????toggleModal????????????');
    }


    public render = () => {
        const { elderly_chi_name } = this.state.singleElderlyInfo;
        const drug_basic_info = this.state.singleElderlyInfo.drug_basic_info;

        return (
            <div className="individual-wrapper">
                <div className="header" >
                    <h1>{this.state.header_recent_stage} - {elderly_chi_name}??????????????? </h1>
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
                                            <span className='drug_name'>????????? {individual_drug_info.name}</span>
                                            <span className='drug_dose'>?????????{individual_drug_info.dose}</span>
                                        </div>
                                        <div className="individual_time_section">
                                            <div className="time_text">???????????????</div>
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
                        {/* <Button onClick={this.props.history.goBack}>??????</Button> */}
                        <Button onClick={this.handleFinishOnClick} className={(this.state.allChecked ? "display" : "invisible")}> ???????????????????????? </Button>
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
        elderlyDrugRecords: state.medicine.elderlyDrugRecords,  //??????????????????info
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
