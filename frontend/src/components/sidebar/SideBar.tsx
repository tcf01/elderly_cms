import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from '../../redux/store';
import './Sidebar.css'
import { toggleSideBar } from '../../redux/sidebar/action';
import { Dispatch } from 'redux';
import Logout from '../logout/Logout';
import { IUserInfo } from '../../redux/login/state';



export interface ISideBarProps {
    isOpen: boolean,
    userInfo: IUserInfo
    toggleSideBar: () => void
}


class SideBar extends React.Component<ISideBarProps> {

    private role = {
        1: '員工',
        2: '主管',
        3: '家屬'
    }


    handleToggle = () => {
        this.props.toggleSideBar();
    }


    render() {
        return (
            <div className="sidebar w3-bar-block w3-card w3-animate-left" style={{ display: this.props.isOpen ? 'block' : 'none' }}>
                <div className="user_info_section">
                    <div className="user-profile image"></div>
                    <div className="control">
                        <span >你好！{this.props.userInfo.username}</span>
                        <span>用戶編號：{this.props.userInfo.id}</span>
                        <span>身份：{this.role[this.props.userInfo.role as 1 | 2 | 3]}</span>
                    </div>
                </div>
                <Link to="/register" onClick={this.handleToggle} className="link"><i className="far fa-plus-square"></i>登記新住客</Link>
                {this.props.userInfo.role === 1 || this.props.userInfo.role === 2 ? <Link to="/client" onClick={this.handleToggle} className="link"><i className="far fa-address-card"></i>住客中心</Link> : null}
                {this.props.userInfo.role === 1 || this.props.userInfo.role === 2 ? <Link to="/TemperatureRecord" onClick={this.handleToggle} className="link"><i className="fas fa-temperature-low"></i>體溫表</Link> : null}
                {this.props.userInfo.role === 1 || this.props.userInfo.role === 2 ? <Link to="/medicine/pack" onClick={this.handleToggle} className="link"><i className="fas fa-tablets"></i>執藥及核藥</Link> : null}
                {/* {this.props.userInfo.role === 1 || this.props.userInfo.role === 2 ? <Link to="/medicine/verify/1" onClick={this.handleToggle} className="link">核藥</Link> : null} */}
                {this.props.userInfo.role === 1 || this.props.userInfo.role === 2 ? <Link to="/medicine/distribute" onClick={this.handleToggle} className="link"><i className="fas fa-hand-holding-heart"></i>派藥</Link> : null}
                {this.props.userInfo.role === 2 ? <Link to="/manager" onClick={this.handleToggle} className="link"><i className="fas fa-tasks"></i>員工管理</Link> : null}
                <Logout name={"登出"} />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        isOpen: state.sidebar.isOpen,
        userInfo: state.auth.userInfo
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggleSideBar: () => dispatch(toggleSideBar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)