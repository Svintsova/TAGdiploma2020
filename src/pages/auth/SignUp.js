import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import {useFormik} from "formik";
import {connect} from "react-redux";
import {Alert} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignUp(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [alertError,setAlertError] = useState("no")

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }

        if (!values.surname) {
            errors.surname = 'Required';
        } else if (values.surname.length > 20) {
            errors.surname = 'Must be 20 characters or less';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
        },
        validate,

        onSubmit: values => {
            setIsLoading(true)
            axios.post('https://api.noirdjinn.dev/user/new', values)
                .then(response => {
                    axios.post(`https://api.noirdjinn.dev/user/authenticate?email=${values.email}&password=${values.password}`)
                        .then(result => {
                            let user_id = result.data.user_id
                            let user_token = result.data.access_token
                            document.cookie = 'id='+encodeURIComponent(user_id)+'; max-age=3600;'
                            document.cookie = 'path=/; max-age=3600;'
                            document.cookie = 'token='+encodeURIComponent(user_token)+'; max-age=3600;'
                            props.userUpdate(
                                user_id,
                                user_token,
                                formik.values.name,
                                formik.values.surname,
                                formik.values.email,
                                result.data.is_admin)
                            setIsLoading('done')
                        })
                })
                .catch(error => {
                    setAlertError(`При регистрации произошла ошибка: ${error.response.data.err}`)
                    setIsLoading(false)
                })

        },
    });

    return isLoading==='done' ? <Redirect to="/" /> :
    (
        <React.Fragment>
            {alertError==="no" ? null : <Alert onClose={() => {setAlertError("no")}} severity="error">{alertError}</Alert>}
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация в системе
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="surname"
                                autoComplete="lname"
                                onChange={formik.handleChange}
                                value={formik.values.surname}
                                error={formik.errors.surname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Почта"
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading||formik.errors.name||formik.errors.surname||formik.errors.email||formik.errors.password}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                           <Link href="#" variant="body2" component={RouterLink} to="/login"  >
                                Уже есть аккаунт? Войти
                           </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
     </React.Fragment>
    );
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
        userUpdate: (id,token,name,surname,email,is_admin) => dispatch({type: 'USER_UPDATE', payload: { id,token,name,surname,email,is_admin}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)