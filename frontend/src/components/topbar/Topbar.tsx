import React from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import { toggleSideBar } from '../../redux/sidebar/action';
import "./Topbar.css"
import { IRootState } from '../../redux/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface ITopBarProps {
    toggleSideBar: () => void,
    isAuthenticated: boolean | null
}

class TopBar extends React.Component<ITopBarProps> {
    handleToggle = () => {
        this.props.toggleSideBar();
    }

    render() {
        return (
            <div >
                {this.props.isAuthenticated ?
                    <Navbar expand="md" className="topBar" fixed="top">
                        <i className="fas fa-list-ul fa-2x" onClick={this.handleToggle}></i>
                        <NavbarBrand href="/client"><span className="main-name">順泰</span><span className="home-name">安老院</span></NavbarBrand>
                    </Navbar>
                    : null}
            </div>
        );
    }
}


const mapStateToProps = (state: IRootState) => ({
    isAuthenticated: state.auth.isAuthenticated
})


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        toggleSideBar: () => dispatch(toggleSideBar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)