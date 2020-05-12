import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from "./UserTable";
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: "center",
    },
}));

export default function Database() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <UserTable />
            </Paper>
        </Container>
    );
}


