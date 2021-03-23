import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import { CardHeader, CardBody, Card, CardText } from 'reactstrap';
import { Dispatch } from "redux";
import moment from 'moment';
// import { Link } from 'react-router-dom';

const { REACT_APP_API_SERVER } = process.env


interface IDailyDrugProps {
  id: number
}

interface IDailyDrugState {
  record: any[]
}

class DailyDrug extends React.Component<IDailyDrugProps, IDailyDrugState> {

  constructor(props: IDailyDrugProps) {
    super(props)
    this.state = {
      record: []
    }
  }

  componentDidMount = async () => {
    const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/${this.props.id}/record`
      , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    const json = await res.json();
    console.log(json.result)
    if (json.isSuccess) {
      this.setState({
        record: json.result
      })
    }
  }

  render() {
    return (
      <div className="daily-drug-card">
        {(this.state.record.length > 0) &&


          this.state.record.map((record, index) => {
            return (
              <Card key={index}>
                <CardHeader tag="h3"><i className="far fa-calendar-alt"></i>&nbsp; &nbsp;{moment(record.have_drug_date).format('YYYY-MM-DD')}</CardHeader>
                <CardBody>
                  {record.time.map((time: any) => {
                    return (
                      <>
                        <CardText tag="h4">{moment(time.have_drug_time, 'h:mm A').format('h:mm A')}</CardText>
                        {time.drug.map((drug: any) => {
                          let status = ""
                          let drugStatusColor =""
                          switch (drug.status) {
                            case "delivered":
                              status = "已服用";
                              drugStatusColor ="daily-drug-green daily-drug-show";
                              break
                            case "home":
                              status = "因事回家";
                              drugStatusColor ="daily-drug-amber daily-drug-show";
                              break
                            case "hospital":
                              status = "入院";
                              drugStatusColor ="daily-drug-amber daily-drug-show";
                              break
                            case "reject":
                              status = "拒絕服用";
                              drugStatusColor ="daily-drug-red daily-drug-show";
                              break
                            case "others":
                              status = "其他";
                              drugStatusColor ="daily-drug-red daily-drug-show";
                              break
                            default:
                              status = ""
                          }

                          return (
                            <CardText>
                              <div className="flex"><div className="daily-drug-width">藥物：{drug.drug_name}</div>  <div className="daily-drug-width">劑量：{drug.dose}({drug.isOfficial ? "處方藥物" : "非處方藥物"})</div> <div className={drugStatusColor}>{status}</div></div>
                              </CardText>
                          )
                        })}
                      </>
                    )
                  }
                  )}
                </CardBody>
              </Card>
            )
          })
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyDrug);