import * as React from 'react'
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from '../../redux/store';
import { getAllClientMedicineRecord } from '../../redux/medicine/thunk';
import { MedicineClientCard } from './ClientCard';
import { IPerMedicineRecordCard } from '../../redux/packMedicine/state';
import moment from 'moment';


export interface IPackMedicinePanelProps {
    elderlyDrugRecords: IPerMedicineRecordCard[];
    elderlyIdReference: Number[];
    getAllElderlyMedicineRecord: () => void
}

class PackMedicinePanel extends React.Component<IPackMedicinePanelProps>{

    public componentDidMount = () => {
        this.props.getAllElderlyMedicineRecord()
    }
    
    public render = () => {
        return (
            <div className="medicine-big-wrapper">
                <h1><i className="fas fa-tablets head-sign"></i>執藥及核藥 {moment().format('YYYY-MM-DD')}</h1>
                <div className="colorRef">
                    未執藥:<span className={"pack-block"} ></span>
                    未核藥:<span className={"verify-block"}></span>
                    未派藥:<span className={"deliver-block"}></span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {this.props.elderlyDrugRecords.map((data, index) => {
                        return <MedicineClientCard key={index} {...data} />
                    })}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        /*
        LHS: props name in the component 
        RHS: key name of the redux store 
        */
        elderlyDrugRecords: state.medicine.elderlyDrugRecords
        
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        getAllElderlyMedicineRecord: () => dispatch(getAllClientMedicineRecord())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PackMedicinePanel)