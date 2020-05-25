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
import UserDialog from "../../../ components/userDialog/userDialog";
import EditIcon from '@material-ui/icons/Edit';
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: "center",
    },
}));



function onDeleteClickHandler (id, token) {
    console.log('UserID: ', id, token)
}



function UserTable(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState({})
    const [open, setOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState({})


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
            <Container className={classes.root} maxWidth="md">
            <Paper className={classes.paper} >
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Почта</TableCell>
                            <TableCell>Тип</TableCell>
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
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => {
                                            setOpen(true)
                                            setSelectedUser(  {
                                                    id: row.id,
                                                    first_name: row.first_name,
                                                    last_name: row.last_name,
                                                    is_admin: row.is_admin,
                                                    token: props.user.token
                                                }
                                            )
                                            console.log(selectedUser)
                                        }}
                                    >
                                        <EditIcon fontSize='small' color='primary'  />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {open ? <UserDialog user={selectedUser} onClose={() => setOpen(false)} /> : null}
            </Paper>
            </Container>
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

export default connect(mapStateToProps)(UserTable)