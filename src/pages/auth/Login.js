import React, {useState} from 'react';
import {Link as RouterLink, Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link' ;
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import axios from 'axios'
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [alertError,setAlertError] = useState("no")
    const validate = values => {
        const errors = {};
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
            remember: false,
        },
        validate,
        onSubmit: values => {
            setIsLoading(true)
            axios.post(`https://api.noirdjinn.dev/user/authenticate?email=${values.email}&password=${values.password}`)
                .then(result => {
//cookies
                    let user_id = result.data.user_id
                    let user_token = result.data.access_token
                    document.cookie = 'path=/; max-age=3600;'
                    if (values.remember) {
                        document.cookie = 'id=' + encodeURIComponent(user_id) + '; max-age=86400;'
                        document.cookie = 'token=' + encodeURIComponent(user_token) + '; max-age=86400;'
                    }

                    axios.get(`https://api.noirdjinn.dev/user/id/${user_id}?token=${user_token}`)
                        .then(userInfo => {
                            props.userUpdate(
                                userInfo.data.id,
                                result.data.access_token,
                                userInfo.data.first_name,
                                userInfo.data.last_name,
                                userInfo.data.email,
                                userInfo.data.is_admin)
                            setIsLoading('done')
                        })


                })
                .catch(error => {
                    setAlertError(`При попытке пойти произошла ошибка: ${error.response.data.err}`)
                    setIsLoading(false)

                })

        },
    });

    return isLoading==='done'||props.user? <Redirect to="/" />:
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
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <FormControlLabel
                        control={<Checkbox name="remember" id="remember" value={formik.values.remember} onChange={formik.handleChange} color="primary" />}
                        label="Remember me"
                    />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading||formik.errors.email}
                        >
                            Sign In
                        </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" component={RouterLink}  to='/sign-up'>
                                {"Don't have an account? Sign Up"}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)