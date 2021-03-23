import React from 'react';
import { IRootState } from '../../redux/store';
import { Time } from '../../redux/medDeliver/state';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import moment from 'moment';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

const { REACT_APP_API_SERVER } = process.env


interface MedProps {
    medicine: Time[]
    match: {
        params: {
            time: string,
            id: string
            // id: number
        }
    }
    redirect: () => void
}
interface MedState {
    drugStatus: any[]
    medicine: any[]
    time: string
    name: string
    date: string
    active: any[]
}


class Med extends React.Component<MedProps, MedState>{

    constructor(props: MedProps) {
        super(props)
        this.state = {
            drugStatus: [],
            medicine: [],
            time: "",
            name: "",
            date: "",
            active: []
        }
    }

    componentDidMount = () => {
        console.log("componentDidMount")

        const time = this.props.medicine.find(time => moment(time.time, 'HH:mm:ss').format('HH:mm:ss') === this.props.match.params.time)
        console.log(time)
        if (time !== undefined) {
            const med = time.elderly.find(elderly => elderly.elderly_id === parseInt(this.props.match.params.id))
            console.log(med)
            if (med !== undefined) {

                this.setState({
                    medicine: med.medicine,
                    time: moment(time.time, 'h:mm A').format('h:mm A'),
                    date: moment(time.date).format('YYYY-MM-DD'),
                    name: med.name
                })
            }
        }

    }
    // componentDidMount = () => {
    //     console.log("componentDidMount")

    //     const time = this.props.medicine.find(time => time.time === this.props.match.params.time)
    //     console.log(time)
    //     if (time !== undefined) {
    //         const med = time.elderly.find(elderly => elderly.elderly_id === this.props.match.params.id)
    //         console.log(med)
    //         if (med !== undefined) {

    //             this.setState({
    //                 medicine: med.medicine,
    //                 time: moment(time.time, 'h:mm A').format('h:mm A'),
    //                 date: moment(time.date).format('YYYY-MM-DD'),
    //                 name: med.name
    //             })
    //         }
    //     }

    // }

    private buttonAction = async (id: number, choice: number, arrayIndex: number, field: string) => {
        console.log(this.state.medicine)

        const newDrugState = this.state.medicine.slice();
        const index = newDrugState.findIndex((element: any) => element.drug_details_id === id);
        newDrugState[index].status_id = choice

        const newActiveState = this.state.active.slice();
        newActiveState[arrayIndex] = field

        console.log(newDrugState)
        this.setState({
            medicine: newDrugState,
            active: newActiveState
        })

        const obj = { drug_details_id: id, status_id: choice }
        console.log(obj)
        await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/alter/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(obj)
        })

    }

    render() {
        let redirect = true;

        if (this.state.medicine.length > 0) {
            for (let item of this.state.medicine) {
                if (item.status_id === undefined) {
                    redirect = false
                }
            }
        } else {
            redirect = false
        }

        if (redirect === true) {
            alert(`${this.state.name}派藥紀錄 已更新`)
            this.props.redirect()
        }


        return (
            <>{this.state.medicine.length > 0 ?
                <Alert color="success set-z-index-1111">
                    <div className="alert-top">
                    <Button className="hidden">返回</Button>
                    <div><h1 className="set-media">現正派發 {this.state.name} {this.state.date} <b>{this.state.time} </b>藥物</h1></div>
                    <Link to="/medicine/distribute"><Button>返回</Button></Link>
                    </div>
                    <div><h3>{this.state.medicine.length} 款藥物</h3></div>
                </Alert> 
                :
                <Alert color="danger ">"請重回派藥版面"
                <Link to="/medicine/distribute"><Button>返回</Button></Link></Alert>}
                <div className="med-wrapper">
                    {this.state.medicine.length > 0 &&

                        this.state.medicine.map((medicine, index) =>

                            <div className="med" key={index}>
                                <div className="medi-image-wrapper"><img src={`${medicine.drug_image}`} alt={`${medicine.drug_name}相片`} className="medi-image" /></div>

                                <div className="medi-mediDetails-wrapper">
                                    <h2 className="mediDetails drug-name">{medicine.drug_name}</h2>
                                    <h2 className="mediDetails">劑量：{medicine.dose}</h2>
                                    <span className="mediDetails">類別：{medicine.isOfficial === true ? "處方藥物" : "非處方藥物"}</span>
                                </div>

                                <div className="buttons">
                                    <span className={this.state.active[index] === "delivered" ? "bactive med-selection-button" : "med-selection-button"} onClick={() => this.buttonAction(medicine.drug_details_id, 4, index, "delivered")} ><i className="fas fa-clipboard-check fa-3x"></i>已服用</span>
                                    <span className={this.state.active[index] === "home" ? "bactive med-selection-button" : "med-selection-button"} onClick={() => this.buttonAction(medicine.drug_details_id, 5, index, "home")}  ><i className="fas fa-home fa-3x"></i>因事回家</span>
                                    <span className={this.state.active[index] === "hospital" ? "bactive med-selection-button" : "med-selection-button"} onClick={() => this.buttonAction(medicine.drug_details_id, 6, index, "hospital")}  ><i className="fas fa-ambulance fa-3x"></i>入院</span>
                                    <span className={this.state.active[index] === "reject" ? "bactive med-selection-button" : "med-selection-button"} onClick={() => this.buttonAction(medicine.drug_details_id, 7, index, "reject")}  ><i className="far fa-times-circle fa-3x"></i>拒絕服用</span>
                                    <span className={this.state.active[index] === "others" ? "bactive med-selection-button" : "med-selection-button"} onClick={() => this.buttonAction(medicine.drug_details_id, 8, index, "others")}  ><i className="fas fa-edit fa-3x"></i>其他</span>
                                </div>
                            </div>


                        )}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        medicine: state.medDeliverInfo.result
    }
}


// Thunk
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        redirect: () => (dispatch(push('/medicine/distribute')))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Med);