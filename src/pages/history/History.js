import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Card from "../../ components/historyCard/Card";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {connect} from "react-redux";
import Loader from "../../ components/Loader/Loader";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
    padTop: {
        paddingTop: theme.spacing(6),
    }
}));

function getLeasesList(leasesList,showList) {
    switch (showList) {
        case "all":
            return (
                leasesList.map((lease,index) => (
                        <Grid item key={index} xs={12} >
                            <Card
                                type = {lease.cell_type}
                                start = {lease.start_time}
                                cell = {lease.cell_id}
                                token = {lease.token}
                                is_returned = {lease.is_returned}
                            />
                        </Grid>
                    ))
            );
        case "active": {
            let newList = leasesList.filter(item => item.is_returned === false)
            return (
                    newList.map((lease, index) => (
                        <Grid item key={index} xs={12}>
                            <Card
                                type={lease.cell_type}
                                start={lease.start_time}
                                cell={lease.cell_id}
                                token={lease.token}
                                is_returned={lease.is_returned}
                            />
                        </Grid>
                    ))
            );
        }
        case "past": {
            let newList = leasesList.filter(item => item.is_returned === true)
            return (
                    newList.map((lease, index) => (
                        <Grid item key={index} xs={12}>
                            <Card
                                type={lease.cell_type}
                                start={lease.start_time}
                                cell={lease.cell_id}
                                token={lease.token}
                                is_returned={lease.is_returned}
                            />
                        </Grid>
                    ))
            );
        }
        default:
            return 'Unknown';
    }

}


function History(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [leasesList, setLeasesList] = useState([])
    const [showList, setShowList] = useState("all")

    useEffect(() => {
        axios.get(`https://api.noirdjinn.dev/lease/leases_by_user?token=${props.user.token}&with_closed=true`)
            .then(result => {
                console.log('Leases', result);
                setLeasesList(result.data)
                setIsLoading(true)
            })
            .catch(error => {
                console.log("Произошла ошибка:", error)
                setIsLoading(true)
            })
    }, [])

    if (!isLoading) {
        return (
            <React.Fragment>
                <Typography
                    variant="h6"
                    align='center'
                >
                    Идет загрузка данных...
                </Typography>
                <Loader />

            </React.Fragment>
        )
    }
    else {
        if (leasesList.length === 0) {
            return (
                <React.Fragment>
                    <Typography
                        className={classes.cardGrid}
                        variant="h6"
                        align='center'
                    >
                        Ваша история пуста. Возьмите оборудование, чтобы увидеть его здесь.
                    </Typography>


                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment >
                    <Container className={classes.cardGrid} maxWidth="md" >

                        <Grid container spacing={2}>
                            <ButtonGroup variant="text"  aria-label="text primary button group" >
                                <Button
                                    color="primary"
                                    onClick={() => {setShowList('past')}}
                                >
                                    Закрытые
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => {setShowList('active')}}
                                >
                                    Текущие
                                </Button>
                                <Button
                                    color="default"
                                    onClick={() => {setShowList('all')}}
                                >
                                    Все
                                </Button>
                            </ButtonGroup>
                            {getLeasesList(leasesList, showList)}
                            {/*{leasesList.map((lease,index) => (*/}
                            {/*    <Grid item key={index} xs={12} >*/}
                            {/*        <Card*/}
                            {/*            type = {lease.cell_type}*/}
                            {/*            start = {lease.start_time}*/}
                            {/*            cell = {lease.cell_id}*/}
                            {/*            token = {lease.token}*/}
                            {/*            is_returned = {lease.is_returned}*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*))}*/}
                        </Grid>
                    </Container>
                </React.Fragment>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
    }
}
export default connect(mapStateToProps)(History)