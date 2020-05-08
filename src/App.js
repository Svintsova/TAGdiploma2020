import React, {Component} from 'react';
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

function App() {
  return (

          <BrowserRouter>
            <div className="">
              <Switch>
                <Route path="/login" exact component={Login}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Layout>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Actions} />
                <PrivateRoute exact path="/history" component={History} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact admin path="/database" component={Database} />
                </Layout>
              </Switch>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </div>
          </BrowserRouter>

  );
}

export default App;



export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Take ang go. HSE MIEM.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

