import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../ components/Loader/Loader";
import Container from "@material-ui/core/Container";

import {connect} from "react-redux";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell, Label,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    typography: {
        padding: theme.spacing(2),
    },
    buttonWidth: {
        minWidth: '58px',
        boxSizing: "border-box"
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: "center" ,
        alignItems: "center" ,
        marginBottom: theme.spacing(4),
    },
}));

function getLeasesByTypeAndDate(leasesByTypeAndDate) {
    console.log(leasesByTypeAndDate);
    let newAr=[]
    leasesByTypeAndDate.forEach(element => (
        !newAr.includes(element.date) ? newAr.push(element.date):
        console.log(element)

    ))

    leasesByTypeAndDate.forEach(element => (
        !newAr.includes(element.date) ? newAr.push(element.date):
            console.log(element)
    ))
    console.log(newAr)
}



function Statistics(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [cellList, setCellList] = useState({})
    const [stat, setStat] = useState({})
    const [userGrowth, setUserGrowth] = useState({})
    const [leasesGrowth, setLeasesGrowth] = useState({})
    const [leasesByType, setLeasesByType] = useState({})
    const [equipmentFreeRatio, setEquipmentFreeRatio] = useState({})
    const [leasesByTypeAndDate, setLeasesByTypeAndDate] = useState({})


    useEffect(() => {
        axios.get(`https://api.noirdjinn.dev/statistics/all?token=${props.user.token}`)
            .then(result => {
                setStat(result.data)
                setIsLoading(true)
                setUserGrowth(result.data.user_growth_by_date)
                setLeasesGrowth(result.data.lease_growth_by_date)
                setLeasesByType(result.data.leases_by_type)
                setEquipmentFreeRatio(result.data.equipment_free_ratio)
                setLeasesByTypeAndDate(result.data.leases_by_type_and_date)
                getLeasesByTypeAndDate(result.data.leases_by_type_and_date)
            })
            .catch(error => {
                alert(error)
                setIsLoading(true)
            })
    }, [])

    const colors = ['#4791db','#e33371','#ffb74d','#64b5f6','#81c784']

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
        return (
            <Container component="main" maxWidth="md">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Количество новых пользователей системы
                        </Typography>
                        <LineChart width={730} height={250} data={userGrowth}
                                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" name='Количество новых пользователей' stroke="#8884d8" />
                        </LineChart>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Количество бронирований
                        </Typography>
                        <LineChart width={730} height={250} data={leasesGrowth}
                                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#ffb74d" name='Количество аренд'/>
                        </LineChart>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Комплектация системы
                        </Typography>

                        <BarChart width={600} height={300} data={equipmentFreeRatio}
                                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="free"  name='Свободно' fill="#81c784" />
                            <Bar dataKey="total" name='Всего' fill="#3f51b5" />
                        </BarChart>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Популярность оборудования
                        </Typography>

                        <BarChart width={600} height={300} data={leasesByType}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" />

                            <YAxis dataKey="count"/>
                            <Tooltip/>
                            <Legend />
                            <Bar name="Количество аренд" dataKey="count" fill="#e33371" />
                        </BarChart>
                    </Paper>
                </Grid>



            </Container>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.profile.user,
    }
}

export default connect(mapStateToProps)(Statistics)