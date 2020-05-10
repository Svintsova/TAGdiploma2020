import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {useFormik} from "formik";
import axios from "axios";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Profile(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: props.user.name,
            surname:props.user.surname,
            id: props.user.id
        },
        onSubmit: values => {
            setIsLoading(true)
            alert(JSON.stringify(values, null, 2));
            const response = axios.post(`https://api.noirdjinn.dev/user/update_info?token=${props.user.token}`, values)
                .then(result => {
                    alert(JSON.stringify(result, null, 2));
                    props.profileUpdate(values.name,values.surname)
                    setIsLoading(false)

                })
                .catch(error => {
                    alert("При обновлении профиля произошла ошибка")
                    setIsLoading(false)
                })

        },
    });

    const formikPass = useFormik({
        initialValues: {
            old_password: null,
            new_password: null,
            token: props.user.token,
        },
        onSubmit: values => {
            setIsLoading(true)
            alert(JSON.stringify(values, null, 2));
            const response = axios.post(`https://api.noirdjinn.dev/user/update_password?token=${values.token}&old_password=${values.old_password}&new_password=${values.new_password}`)
                .then(result => {
                    alert(JSON.stringify(result, null, 2));
                    setIsLoading(false)
                })
                .catch(error => {
                    alert("При смене пароля произошла ошибка")
                    setIsLoading(false)
                })

            console.log(response.data)
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}  elevation={3}>
                <Typography component="h1" variant="h5">
                    Ваши данные
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit} >
                    <TextField
                        id="name"
                        variant="outlined"
                        label="Имя"
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <TextField
                        id="surname"
                        variant="outlined"
                        label="Фамилия"
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        onChange={formik.handleChange}
                        value={formik.values.surname}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        multiline
                        disabled
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={props.user.email}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading}

                    >
                        Обновить информацию
                    </Button>
                </form>

            </Paper>

            <Paper className={classes.paper}  elevation={3}>
                <form className={classes.form} onSubmit={formikPass.handleSubmit} >
                    <Typography component="h1" variant="h5"  align="center">
                        Смена пароля
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        label="Текущий пароль"
                        type="password"
                        id="old_password"
                        autoComplete="current-password"
                        onChange={formikPass.handleChange}
                        value={formikPass.values.old_password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        label="Новый пароль"
                        type="password"
                        id="new_password"
                        onChange={formikPass.handleChange}
                        value={formikPass.values.new_password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={isLoading}

                    >
                        Подтвердить
                    </Button>
                </form>
            </Paper>

        </Container>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        profileUpdate: (name,surname) => dispatch({type: 'PROFILE_UPDATE', payload: {name,surname}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
