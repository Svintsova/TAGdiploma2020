import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from "./UserTable";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

export default function Database() {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <UserTable />
            </Paper>
        </Grid>
    );
}


