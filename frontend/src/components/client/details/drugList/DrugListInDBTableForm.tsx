import React from 'react';
import {  DrugFormat } from '../../../../interface';
import { Table } from 'reactstrap';
import moment from 'moment';
import { Drug } from '../../../../redux/drugList/state';
import { IRootState } from '../../../../redux/store';
import { connect } from 'react-redux';

// const { REACT_APP_API_SERVER } = process.env

interface IDrugListInDBProps {
    id:number,
    drugList:Drug[]
}
interface IDrugListInDBState {
    result:DrugFormat[]
}

class DrugListInDBTableForm extends React.Component<IDrugListInDBProps,IDrugListInDBState>{
    constructor(props: IDrugListInDBProps) {
        super(props)
        this.state={
            result:[]
        }
    }


    render() {
        console.log(this.state)
        return (
            
               <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>藥名</th>
                <th>劑量</th>
                <th>按需要服</th>
                <th>次數</th>
                <th>時間</th>
                <th>開始日期</th>
                <th>結束日期</th>
                <th>醫生服務機構</th>
                <th>特別藥物/注意事項</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

            {this.props.drugList.length>0 && this.props.drugList.map((drug,index)=>{return (
            <tr key={index}>
                <th scope="row">{index+1}}</th>
                <td>{drug.drug_name}</td>
                <td>{drug.dose}</td>
                <td>{drug.depend_on_need===true?"按需要時服":"每天服用"}</td>
                <td>{drug.times_per_day}</td>
                <td>{drug.drugInterval!==undefined && drug.drugInterval.map((time,index)=>(
                    <div key={index}>{moment(time.time,'h:mm:ss A').format('h:mm A')}</div>
                ))}</td>
                <td>{drug.start_date===null?"未開始服用":moment(drug.start_date).format('YYYY-MM-DD')}</td>
                <td>{drug.end_date===null?"":moment(drug.end_date).format('YYYY-MM-DD')}</td>
                <td>{drug.authorized_hospital}</td>
                <td>{drug.reason_of_taking}</td>
                <td>{drug.isOfficial===true?"處方藥物":"非處方藥物"}</td>
            </tr>)}
            )}
             </tbody>
          </Table>
          
        )
    }
}


const mapStateToProps=(state: IRootState)=>{
    return {
    drugList:state.drugList.drug
    }
}


export default connect(mapStateToProps)(DrugListInDBTableForm);
