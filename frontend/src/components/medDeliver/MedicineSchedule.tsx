import * as React from 'react';
import { ThunkDispatch, IRootState } from '../../redux/store';
import { connect } from 'react-redux';
import { loadElderlyMedicine } from '../../redux/medDeliver/actions';
import { Time } from '../../redux/medDeliver/state';
// import Elder from './Elderly';
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
            <>
            <h1>派藥 {moment().format('YYYY-MM-DD')}</h1>
            
            {this.props.medInfo.length>0 && this.props.medInfo.map((time,index)=>(
            <div key={index}>
                <h2 className="time">{ moment(time.time,'h:mm A').format('h:mm A') }</h2>
                {/* <div className="elderlyName"><Elder elderly={time.elderly}/></div> */}
            </div>
            ))}
            </>
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