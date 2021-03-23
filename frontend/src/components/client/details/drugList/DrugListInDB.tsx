import React from 'react';
import { DrugDetails } from '../../../../interface';
import { Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { remoteLoadDrugList } from '../../../../redux/drugList/thunk'
import { ThunkDispatch, IRootState } from '../../../../redux/store';
import { Drug } from '../../../../redux/drugList/state';

interface IDrugListInDBProps {
    id: number,
    remoteLoadDrugList:(id:number)=>void,

    drugList:Drug[]
}
interface IDrugListInDBState {
    result?:DrugDetails
}

class DrugListInDB extends React.Component<IDrugListInDBProps,IDrugListInDBState>{
    constructor(props: IDrugListInDBProps) {
        super(props)
        this.state={
        }
    }

    componentDidMount = async () => {
        console.log("DrugListinDB- componentDidMount")
        this.props.remoteLoadDrugList(this.props.id)
    
    }

    render() {
        console.log(this.props.drugList)
        return (
            <>
            {this.props.drugList.length>0 && this.props.drugList.map((drug,index)=>{
                return (
                <span key={index} className="drug">
                      <Card>
                        <div className="drug-header"><div>{drug.drug_name}</div><div>每日{drug.times_per_day}次</div></div>
                        <div className="drug-image-wrapper">
                      <img src={drug.drug_image===null?`https://s3.ap-southeast-1.amazonaws.com/tecky-proj-3.static/new_drug_pic-1567950304212.jpeg`:`${drug.drug_image}`} alt={`${drug.drug_name}相片`} className="drug-image" />
                      </div>
                      <CardBody>
                       <br />藥物名稱：{drug.drug_name} 
                       <div>每日 {drug.times_per_day} 次</div> 
                       <div>每次服用 {drug.dose||`未設定`}</div>
                       
                       <br />服藥時間：{(drug.drugInterval!==undefined&&drug.drugInterval.length>0)
                                            ?
                                            drug.drugInterval.map((time,index)=>(
                                              <div key={index}>{moment(time.time,'h:mm:ss A').format('h:mm A')}</div>))
                                            :
                                            (<>未有設定<br /></>)
                                            }
                        
                       <br />開始日期：{drug.start_date===null?"未開始服用":moment(drug.start_date).format('YYYY-MM-DD')}
                       <br />結束日期：{drug.end_date===null?"未有設定":moment(drug.end_date).format('YYYY-MM-DD')}

                      <br />
                       <br />藥物來源：{drug.authorized_hospital||"沒有"}
                       <br />備註：{drug.reason_of_taking}  
                       <br />{drug.isOfficial===true?"處方藥物":"非處方藥物"}
                       <br />{drug.depend_on_need===true?"按需要時服":"每天服用"}
                      </CardBody>
                    </Card>
                    </span>
            
            )}
            )}
            </>
        )
    }
}


const mapStateToProps=(state: IRootState)=>{
    return {
    drugList:state.drugList.drug
    }
}

const mapDispatchToProps=(dispatch:ThunkDispatch)=>{
  return {
    remoteLoadDrugList:(id:number)=>dispatch(remoteLoadDrugList(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrugListInDB);