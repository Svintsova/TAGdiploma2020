import React from 'react';

import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import Card from "../../ components/historyCard/Card";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexDirection: 'column',
        flexGrow: 1,
    },
    Button: {
        paddingTop: theme.spacing(2),
    }
}));


const leases = [
    {id: 435440, type: 'Клавиатура', start: '12/23/2323', end: '12/23/2323',},
    {id: 154324, type: 'Мышь', start: '12/32/3213', end: '12/23/2323',},
    {id: 243243, type: 'Маркер', start: '32/32/5432', end: '12/23/2323',},
    {id: 423443, type: 'Ноутбук', start: '23/14/4322', end: '12/23/2323',},
];


export default function History() {
    const classes = useStyles();

    return (
        <React.Fragment >
            <Container className={classes.cardGrid} maxWidth="md" >
                <Grid container spacing={2}>
                    {leases.map((lease) => (
                        <Grid item key={lease.id} xs={12} >
                            <Card type = {lease.type} start = {lease.start} end = {lease.end} id = {lease.id}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}
