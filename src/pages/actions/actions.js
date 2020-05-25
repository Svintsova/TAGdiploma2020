import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserTable from "./database/UserTable";
import TakeStepper from "./take/Take";
import Statistics from "./statistics/Statistics";
import CellStatus from "./cellStatus/CellStatus";
import CloseCell from "./closeCell/CloseCell";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Actions(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    variant="scrollable"
                    scrollButtons="auto"

                    onChange={handleChange}
                    //centered
                >
                    <Tab label="Взять" {...a11yProps(0)} />
                    <Tab label="Вернуть" {...a11yProps(1)} />
                    { props.user.is_admin ? <Tab label="База данных" {...a11yProps(2)} /> : null}
                    { props.user.is_admin ? <Tab label="Статистика" {...a11yProps(3)} /> : null}
                    { props.user.is_admin ? <Tab label="Состояние ячеек" {...a11yProps(4)} /> : null}


                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TakeStepper/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CloseCell />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserTable />
            </TabPanel>
            <TabPanel value={value} index={3}>
                    Статистика
            </TabPanel>
            <TabPanel value={value} index={4}>
                <CellStatus />
            </TabPanel>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded
    }
}

export default connect(mapStateToProps)(Actions)

