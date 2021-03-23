import * as React from 'react';
import { ThunkDispatch, IRootState } from '../../redux/store';
import { connect } from 'react-redux';
import { loadElderlyMedicine } from '../../redux/medDeliver/actions';
import { Time } from '../../redux/medDeliver/state';
import Elder from './Elderly';
import './MedicineDeliver.css';
import moment from 'moment';

export interface IMedicineDeliverProps {
    loadElderlyMedicine:()=>void;
    medInfo:Time[]
}

class MedicineDeliver extends React.Component<IMedicineDeliverProps> {

    componentDidMount(){
        console.log("componentDidMount")
        this.props.loadElderlyMedicine();
    }
    
    render() {
        console.log(this.props.medInfo)
        return (
            <div className="med-deliver-wrapper">
            <h1><i className="fas fa-hand-holding-heart head-sign"></i>派藥 {moment().format('YYYY-MM-DD')}</h1>
                <div className="colorRef">
                    未執藥:<span className={"pack-block"}></span>
                    未核藥:<span className={"verify-block"}></span>
                    未派藥:<span className={"deliver-block"}></span>
                </div>
                <div className="med-deliver-margin">
            {this.props.medInfo.length>0 && this.props.medInfo.map((time,index)=>(
            <div key={index}>
                <h2 className="time">{ moment(time.time,'h:mm A').format('h:mm A') }</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' ,justifyContent: 'center'}}><Elder elderly={time.elderly} time={time.time}/></div>
            </div>
            ))}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        medInfo: state.medDeliverInfo.result
    }
}


// Thunk
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadElderlyMedicine: () => dispatch(loadElderlyMedicine())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicineDeliver);