import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ButtonBar from '../button/ButtonBar';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "baseline",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Actions({type, start, end, id}) {
    const classes = useStyles();

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={4}>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Тип
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {type}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Начало
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {start}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Конец
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {end}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Код брони
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {id}
                                </Typography>
                            </Grid>

                    </Grid>

                </Paper>
            </div>
        )
    }


