import React, { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router';


const PrivateRoute = ({ component, admin, user, ...rest }) => {
    let renderer = null;
    console.log('PRIVET',{ component, admin, user, ...rest })
    if (!user) {
        const backPath = btoa(window.location.pathname + window.location.search);
        renderer = () => <Redirect to={`/login?to=${backPath}`} />
    } else if (admin && user.root !== 'admin') {
        renderer = () => <Redirect to={'/'} />
    } else {
        renderer = (props: RouteComponentProps<any>) =>
            React.createElement(component, props);
    }
    return <Route {...rest} render={renderer} />;
}

const mapStateToProps = (state) => ({
    user: state.profile.user,
    loading: state.profile.loading,
    IsLoaded: state.profile.IsLoaded,
});

export default connect(mapStateToProps)(PrivateRoute);