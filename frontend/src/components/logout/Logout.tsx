import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from "../../redux/store";
import { logout } from "../../redux/login/thunk";
import { Link } from "react-router-dom";
import { toggleSideBar } from "../../redux/sidebar/action";




interface ILoginProps{
    isAuthenticated: boolean | null
    name: string,
    toggleSideBar: () => void
    logout: ()=> void
}

class Logout extends React.Component<ILoginProps,{}> {
    
    private logout = ()=>{
        this.props.toggleSideBar();
        this.props.logout();
    }

    public render() {
        return (
        <div className="logout-bar">
            {
                <Link to="" onClick={this.logout} className="link"><i className="fas fa-sign-out-alt"></i>登出</Link>
            }
        </div>
        );
    }
}

const mapStateToProps = (state:IRootState)=>({
    isAuthenticated:  state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch:ThunkDispatch)=>({
    logout: ()=>dispatch(logout()),
    toggleSideBar: () => dispatch(toggleSideBar())
})

export default connect(mapStateToProps,mapDispatchToProps)(Logout)
