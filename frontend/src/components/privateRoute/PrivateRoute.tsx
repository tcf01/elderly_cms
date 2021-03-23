import * as React from 'react';
import { IRootState, ThunkDispatch } from '../../redux/store';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface IPrivateRouteProps extends RouteProps {
    isAuthenticated: boolean | null;
    userRole: number
    roles: number[]
}

const PurePrivateRoute = ({ component, isAuthenticated, userRole, roles, ...rest }: IPrivateRouteProps) => {
    const Component = component;
    if (Component == null) {
        return null;
    }

    let render: (props: any) => JSX.Element

    if (isAuthenticated && roles.includes(userRole)) {
        render = (props: any) => (
            <Component {...props} />
        )
    } else if (isAuthenticated === null ) {
        render = (props: any) => ( <div>Loading</div> )
    }else if (isAuthenticated && !(roles.includes(userRole))) {
        render = (props: any) => (
            <Redirect to={{
                pathname: '/notFound',
                state: { from: props.location }
            }} />
        )
    }
    else {
        render = (props: any) => (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    }
    return <Route {...rest} render={render} />
};

const mapStateToProps = (state: IRootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userRole: state.auth.userInfo.role
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({

})

export const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(PurePrivateRoute);