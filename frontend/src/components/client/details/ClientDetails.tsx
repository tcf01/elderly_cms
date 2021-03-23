import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../../redux/store';
import BasicInfo from './basicInfo/BasicInfo';
import DailyDrug from './dailyDrug/DailyDrug';
import Temperature from './temperature/Temperature';
import { BasicInfoFormat } from '../../../redux/basicInfo/state';

import { TabContent, TabPane, Nav, NavItem, NavLink ,Button} from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import DrugList from './drugList/DrugList';
import './ClientDetails.css'






interface IDetailsProps {
  match: {
    params: {
      elderlyID: number
    }
  }
  basicInfo: BasicInfoFormat
}


interface IDetailsState {
  activeTab: string,
  name_chi:string,
  bed_number:number|null|undefined
}


class ClientDetails extends React.Component<IDetailsProps, IDetailsState> {

  constructor(props: IDetailsProps) {
    super(props)
    this.state = {
      activeTab: "1",
      name_chi:"",
      bed_number:0
    }
  }



  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    const id = this.props.match.params.elderlyID;
    return (
      <div className="details-big-wrapper">
      <div className="details-head">
      <h2><span className="name">{this.props.basicInfo.name_chi}</span> <span className="bed">床號：{this.props.basicInfo.bed_number||"未設定"}</span></h2>
      <Link to="/client"><Button className="blue-btn"><i className="fas fa-chevron-circle-left"></i> 返回 住客中心</Button></Link>
      </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              個人資料
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              個人藥物清單
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              每日用藥紀錄
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              體溫紀錄
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div><BasicInfo id={id} /></div>
          </TabPane>
          <TabPane tabId="2">
            <div><DrugList id={id} /></div>
          </TabPane>
          <TabPane tabId="3">
            <div><DailyDrug id={id}/></div>
          </TabPane>
          <TabPane tabId="4">
            <div><Temperature id={id} /></div>
          </TabPane>
        </TabContent>

      </div>
    )

  }
}


  const mapStateToProps = (state: IRootState) => {
    return {
      basicInfo: state.basicInfo.basicInfo
    }
  }

  export default connect(mapStateToProps)(ClientDetails)