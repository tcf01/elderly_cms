import React from 'react';
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from '../../../../redux/store';
import { Table } from 'reactstrap';
import DrugListInDB from './DrugListInDB';
import { Time } from '../../../../interface';
import { getAllDrugNames } from '../../../../redux/basicInfo/actions';

const { REACT_APP_API_SERVER } = process.env

interface IClientCardProps {

  getAllDrugNames:()=>void,

  id:number
}

interface IClientCardState {
  elderly_id:number,
  drug_name:string,
  dose:string,
  times_per_day:string,
  start_date:undefined|string,
  end_date:undefined|string,
  depend_on_need:boolean,
  authorized_hospital:string,
  reason_of_taking:undefined|string,
  drugInterval:Time[],
  isOfficial:boolean
}


class DrugList extends React.Component<IClientCardProps,IClientCardState> {

  constructor(props:IClientCardProps){
    super(props)
    this.state={
      elderly_id:this.props.id,
      drug_name:"",
      dose:"",
      times_per_day:"1",
      start_date:"",
      end_date:undefined,
      depend_on_need:false,
      authorized_hospital:"",
      reason_of_taking:"",
      drugInterval:[{time:""}],
      isOfficial:true
    }
  }

  componentDidMount(){
    // this.props.getAllDrugNames();
  }

  private drugInterval=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    this.handleFormChange(event);

    const numberOfInputBox=parseInt(event.target.value);
    const inputBoxDifference=numberOfInputBox-this.state.drugInterval.length

    let newInterval=this.state.drugInterval.slice();
    if (inputBoxDifference>0){
      for(let i=0;i<inputBoxDifference;i++){
        newInterval.push({time:""})
      }
    }else{
      console.log("inputBoxDifference")
      for(let i=inputBoxDifference;i<0;i++){
        newInterval.pop()
      }
    }

    this.setState({
      drugInterval:newInterval
    })

  }

  private handleDrugTimeChange=(event: React.ChangeEvent<HTMLInputElement>, index:number)=>{
    const updatedInterval:Time[]=this.state.drugInterval.slice();
    updatedInterval.splice(index,1,{time:event.target.value})
    this.setState({
      drugInterval:updatedInterval
    })
  }

  private handleFormChange=(event: React.ChangeEvent<any>)=>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  private handleSubmit=async()=>{
    await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/add/${this.props.id}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(this.state)
            }); 
  }



  render() {
    return (
      <>
          用藥紀錄：
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
         
              <DrugListInDB id={this.props.id}/>
            </tbody>
          </Table>
        {/* </Collapse> */}
      </>
    );
  }
}


const mapStateToProps = (state: IRootState) => {
  return {
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
 
    // getAllDrugNames: ()=>dispatch(getAllDrugNames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrugList);