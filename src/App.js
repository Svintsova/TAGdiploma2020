import React from 'react';
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

function App() {
  return (

          <BrowserRouter>
            <div className="">
              <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/home" render={() => <Layout> <Home /> </Layout>} />
                <Route path="/dashboard" render={() => <Layout> <Actions /></Layout>} />
                <Route path="/history" render={() => <Layout><History /></Layout>} />
                <Route path="/profile" render={() => <Layout><Profile /></Layout>} />
                <Route path="/database" render={() => <Layout><Database /></Layout>} />

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