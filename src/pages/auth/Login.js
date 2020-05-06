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

export default function SignIn() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)

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
        },
        validate,
        onSubmit: values => {
            setIsLoading(true)
            alert(JSON.stringify(values, null, 2));
            const response = axios.get('https://api.noirdjinn.dev/user/3')
                .then(result => {
                    alert(JSON.stringify(result, null, 2));
                    setIsLoading('done')
                })
                .catch(error => {
                    alert("Ошибка, попробуйте ввести новые данные")
                    setIsLoading(false)
                })

            console.log(response.data)
        },
    });


    return isLoading==='done'? <Redirect to="/home" /> :
        (
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
                        control={<Checkbox value="remember" color="primary" />}
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
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <RouterLink to='/sign-up'><Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link> </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}