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
            alert(JSON.stringify(values, null, 2));
            const response = axios.post('https://api.noirdjinn.dev/user/new', values)
                .then(result => {
                    alert(response)
                    let user_id = result.data.user_id
                    let user_token = result.data.access_token
                    document.cookie = 'Max-Age=3600; id='+encodeURIComponent(user_id)
                    document.cookie = 'path=/; Max-Age=3600'
                    document.cookie = 'Max-Age=3600; token='+encodeURIComponent(user_token)
                    props.userUpdate(
                        result.data.id,
                        result.data.access_token,
                        formik.values.name,
                        formik.values.surname,
                        formik.values.email)
                    setIsLoading('done')

                })
                .catch(error => {
                    alert("PIZDEC")
                    setIsLoading(false)
                })

            console.log(props)
        },
    });

    return isLoading==='done' ? <Redirect to="/" /> :
    (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
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
                                label="First Name"
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
                                label="Last Name"
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
                                label="Email Address"
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
                                label="Password"
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                           <RouterLink to="/login"> <Link href="#" variant="body2">
                                Already have an account? Sign in
                           </Link> </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
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
        userUpdate: (id,token,name,surname,email) => dispatch({type: 'USER_UPDATE', payload: { id,token,name,surname,email}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)