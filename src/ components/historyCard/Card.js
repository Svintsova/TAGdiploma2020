import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "baseline",
    },
    paperFinish: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderLeft: "10px solid",
        borderLeftColor: theme.palette.primary.main,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderLeft: "10px solid",
        borderLeftColor: theme.palette.secondary.main,

    },
}));


function getNameByType(type) {
    switch (type) {
        case 1:
            return ("Ноутбук"
            );
        case 2:
            return ("Документы"
            );
        case 3:
            return ("Мышь"
            );
        case 4:
            return ("Клавиатура"
            );
        case 5:
            return ( "Маркеры"
            );

        default:
            return 'Unknown';
    }
}

function getTime(time) {
    return ( time.slice(0, 10)
    );

}

export default function Actions({type, start, cell, token,is_returned}) {
    const classes = useStyles();


        return (
            <div className={classes.root}>
                <Paper
                    className={is_returned ? classes.paperFinish : classes.paper}
                >
                    <Grid container spacing={4}>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Тип
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {getNameByType(type)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Ячейка
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {cell}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Начало
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {getTime(start)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography style={{ textTransform: 'uppercase' }} color='primary' gutterBottom>
                                    Код брони
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {token}
                                </Typography>
                            </Grid>

                    </Grid>

                </Paper>
            </div>
        )
    }


