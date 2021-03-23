import * as React from 'react'
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import './Layout.css'
import LoginPanel from './components/loginPanel/LoginPanel';
import ClientDetails from './components/client/details/ClientDetails';
import { ClientCentre } from './components/client/centre/Centre';
import SideBar from './components/sidebar/SideBar';
import ClientCard from './components/client/centre/Cards';
import DailyDrug from './components/client/details/dailyDrug/DailyDrug';
import TopBar from './components/topbar/Topbar';
import RegistrationForm from './components/registration/Registration';
import Contract from './components/contract/Contract';
import PackMedicinePanel from './components/medicine/PackMedicinePanel';
import MedicineDeliver from './components/medDeliver/MedicineDeliver';
import IndividualMedicineCard from './components/individualMedicineCard/IndividualMedicineCard';
import ManagerPage from './components/managerPage/ManagerPage'
import Med from './components/medDeliver/Medicine';
import TemperatureRecord from './components/temperature/TemperatureRecord';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { NotFound } from './components/notFound/notFound';
import { ThunkDispatch, IRootState } from './redux/store';
import { connect } from 'react-redux';
import { getCurrentUser } from './redux/login/thunk';

interface ILayoutProps {
    restoreLogin: () => void
}

class Layout extends React.Component<ILayoutProps & RouteComponentProps<{}>> {

    public componentWillMount = () => {
        this.props.restoreLogin()
    }

    render = () => {
        return (
            <>
                <TopBar />
                <SideBar />
                <Switch>
                    <Route path="/" exact={true} component={LoginPanel} />
                    <PrivateRoute path="/TemperatureRecord" exact={true} component={TemperatureRecord} roles={[1,2]}/>
                    <PrivateRoute path="/client/:elderlyID" exact={true} component={ClientDetails} roles={[1,2]}/>
                    <PrivateRoute path="/ClientCard" exact={true} component={ClientCard} roles={[1,2]} />
                    <PrivateRoute path="/client" exact={true} component={ClientCentre} roles={[1,2]}/>
                    <PrivateRoute path="/DailyDrug" exact={true} component={DailyDrug} roles={[1,2]}/>
                    <PrivateRoute path="/register" exact={true} component={RegistrationForm} roles={[1,2,3]}/>
                    <PrivateRoute path="/contract" exact={true} component={Contract} roles={[1,2]}/>
                    <PrivateRoute path="/medicine/distribute" exact component={MedicineDeliver} roles={[1,2]}/>
                    <PrivateRoute path="/medicine/pack" exact component={PackMedicinePanel} roles={[1,2]}/>
                    {/* <Route path="/medicine/verify" exact component={PackMedicinePanel} procedure={"verify"} /> */}
                    <PrivateRoute path="/medicine/pack/:id" key={this.props.location.pathname} exact={true}roles={[1,2]} component={() => <IndividualMedicineCard procedure={2} />} />
                    <PrivateRoute path="/medicine/verify/:id" key={this.props.location.pathname}roles={[1,2]} exact={true} component={() => <IndividualMedicineCard procedure={3} />} />
                    <PrivateRoute path="/medicine/distribute" exact={true} roles={[1,2]}component={MedicineDeliver} />
                    <PrivateRoute path="/medicine/distribute/:time/:id" exact={true} roles={[1,2]}component={Med} />
                    <PrivateRoute path="/manager" exact={true} component={ManagerPage} roles={[2]} />
                    <Route path="/notFound" exact={true} component={NotFound} />
                </Switch>
            </>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        restoreLogin: () => dispatch(getCurrentUser())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layout))
