import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {Layout} from "./pages/layout/Layout";
import Actions from "./pages/actions/actions";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import History from "./pages/history/History";
import Database from "./pages/actions/database/Database";
import PrivateRoute from "./ components/PrivateRoute/PrivateRoute";
import {connect} from "react-redux";
import axios from "axios";
import Container from "@material-ui/core/Container";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function App(props) {

    useEffect(() => {
        let isInit = getCookie('id')
        let isToken = getCookie('token')
        if (isInit) {
            axios.get(`https://api.noirdjinn.dev/user/id/${isInit}?token=${isToken}`)
                .then(userInfo => {
                    props.userUpdate(
                        userInfo.data.id,
                        isToken,
                        userInfo.data.first_name,
                        userInfo.data.last_name,
                        userInfo.data.email,
                        userInfo.data.is_admin)
                    props.changeLoaded()
                })
                .catch(error => {
                props.changeLoaded()
            })
        }
         else {props.changeLoaded()}
    }, [])

    if (!props.IsLoaded) {
        return null
    }

  return (

          <BrowserRouter>
            <div className="">
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Layout>
                    <PrivateRoute exact path="/dashboard" component={Actions} />
                    <PrivateRoute exact path="/history" component={History} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact admin path="/database" component={Database} />
                    <PrivateRoute exact path="/" component={Home} />
                </Layout>
              </Switch>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </div>
          </BrowserRouter>

  );
}


function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userUpdate: (id,token,name,surname,email,is_admin) => dispatch({type: 'USER_UPDATE', payload: { id,token,name,surname,email,is_admin}}),
        changeLoaded: () =>  dispatch({type: 'SET_LOADED'})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)



export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Веб-приложение: Свинцова Анастасия'}<br/>
            {'Сервер и база данных: Конышев Дмитрий'}<br/>
            {'Мобильное приложение: Агасандян Богдан'}<br/>
            {'Аппаратная часть: Карабанов Илья'}<br/>
            <Link color="inherit" href="https://www.hse.ru/edu/vkr/368722612">
                Take ang go. HSE MIEM. 2020.
            </Link>
        </Typography>
    );
}

