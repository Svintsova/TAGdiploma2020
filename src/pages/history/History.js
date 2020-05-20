import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import Card from "../../ components/historyCard/Card";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import {connect} from "react-redux";

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




function History(props) {
    const classes = useStyles();
    const [leasesList, setLeasesList] = useState([])

        useEffect(() => {
            axios.get(`https://api.noirdjinn.dev/lease/leases_by_user?token=${props.user.token}&with_closed=true`)
                .then(result => {
                    console.log('Leases', result);
                    setLeasesList(result.data)
                })
                .catch(error => {
                    console.log("Произошла ошибка:", error)
                })
        }, [])


    return (
        <React.Fragment >
            <Container className={classes.cardGrid} maxWidth="md" >
                <Grid container spacing={2}>
                    {leasesList.map((lease,index) => (
                        <Grid item key={index} xs={12} >
                            <Card type = {lease.cell_type} start = {lease.start_time} cell = {lease.cell_id} token = {lease.token}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
    }
}
export default connect(mapStateToProps)(History)