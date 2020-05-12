import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {useFormik} from "formik";
import axios from "axios";
import {connect} from "react-redux";
import Loader from "../../../ components/Loader/Loader";
import Button from '@material-ui/core/Button';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    label: {
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function UserTable(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState({})





    useEffect(() => {
        axios.get(`https://api.noirdjinn.dev/user/all?token=${props.user.token}`)
            .then(result => {
                setUserList(result.data)
                console.log(result.data)
                setIsLoading(true)

            })
            .catch(error => {
                alert(error)
                setIsLoading(false)
            })
    }, [])


    if (!isLoading) {
        return (
            <React.Fragment>
                <Typography
                    variant="h7"
                    align='center'
                    gutterBottom='true'
                >
                    Идет загрузка данных...
                </Typography>
                <Loader />
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Typography variant="h5" align='center'  gutterBottom='true' color="primary" className={classes.label}>База данных</Typography>
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Root</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.Users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    {row.is_admin ? 'admin' : 'user'}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" href="#outlined-buttons" size="small">
                                        edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div><br/></div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable)