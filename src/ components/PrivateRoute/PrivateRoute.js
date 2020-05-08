import React, { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router';


const PrivateRoute = ({ component, admin, user, ...rest }) => {
    let renderer = null;
    if (!user) {
        const backPath = btoa(window.location.pathname + window.location.search);
        renderer = () => <Redirect to={`/login?to=${backPath}`} />
    } else if (admin && user.root !== 'admin') {
        renderer = () => <Redirect to={'/home'} />
    } else {
        renderer = (props: RouteComponentProps<any>) =>
            React.createElement(component, props);
    }
    return <Route {...rest} render={renderer} />;
}

const mapStateToProps = (state) => ({
    user: state.profile.user,
    loading: state.profile.loading,
    isLogining: state.profile.isLogining,
});

export default connect(mapStateToProps)(PrivateRoute);