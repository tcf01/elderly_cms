import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import { Table } from 'reactstrap';
import { Dispatch } from "redux";
import BackendData from './BackendData'

const { REACT_APP_API_SERVER } = process.env

interface ITEMPProps {
id:number
}
interface ITEMPState {
  temperature:any[]
  }

class Temperature extends React.Component<ITEMPProps,ITEMPState> {
  constructor(props:ITEMPProps){
super(props)
this.state={
  temperature:[]
}
  }

  componentDidMount=async ()=>{
    const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/?type=temperature&id=${this.props.id}`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
  const json = await res.json();
  this.setState({
    temperature:json.result
  })

  }


  render() {
    return (
      <>
  
        <Table hover>
        <thead>
          <tr>
            <th>日期</th>
            <th>時間</th>
            <th>體溫</th>
          </tr>
        </thead>
        <tbody>
          <BackendData temperature={this.state.temperature}/>
        </tbody>
      </Table>



      </>

    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperature);