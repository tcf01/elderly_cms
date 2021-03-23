import * as React from 'react';
import { Table, Button } from 'reactstrap';
import { ThunkDispatch, IRootState } from '../../redux/store';
import { loadStaff } from '../../redux/managerPage/thunk';
import { connect } from 'react-redux';
import { StaffInfo } from '../../redux/managerPage/state';
import AddStaffButton from '../addStaff/AddStaffButton';
import "./ManagerPage.css";


export interface IManagerProps {
    loadStaff: () => void
    staffs: StaffInfo[]
}

interface IManagerState {
    staffsInput: {}[];
}

class ManagerPage extends React.Component<IManagerProps, IManagerState> {

    state: IManagerState = {
        staffsInput: []
    }

    public componentWillMount() {
        console.log()
        this.props.loadStaff()
    }

    render() {
        console.log(this.props.staffs)


        return (
            <div className="manager-wrapper">
                <div className="flex">
                <Button className="blue-btn hidden"><i className="fas fa-chevron-circle-left"></i> 返回 住客中心</Button>
                <h1><i className="fas fa-tasks head-sign"></i>員工管理</h1>
                <Button className="blue-btn manager-btn"><i className="fas fa-chevron-circle-left"></i> 返回 住客中心</Button>
                </div>
                <AddStaffButton refresh={this.props.loadStaff} />
                <Table>
                    <thead>
                        <tr>
                            <th className="topBar">員工姓名</th>
                            <th className="topBar">登入帳號</th>
                            {/* <th className="topBar">密碼</th> */}
                            <th className="topBar">權限</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.staffs.map((staff: StaffInfo, index: number) => {
                              const role={
                                1:"員工",
                                2:"主管",
                                3:"住客家屬登記"
                            }
                            return (<tr key={index}>
                                <th className="middleBar" scope="row">{staff.name}</th>
                                <td className="middleBar">{staff.username}</td>
                                {/* <td className="middleBar">{staff.password}</td> */}
                                <td className="middleBar">{role[staff.role_id as 1 | 2 | 3]}</td>
                                {/* <td className="middleBar">{staff.isActive}</td> */}
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        staffs: state.staff.staff
    }
}

//Thunk
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadStaff: () => dispatch(loadStaff())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage)