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
            email: props.user.email,
            password: props.user.password,
            name: props.user.name,
            surname:props.user.surname,
            type: '',
            id:props.id
        },
        onSubmit: values => {
            setIsLoading(true)
            alert(JSON.stringify(values, null, 2));
            const response = axios.post('https://api.noirdjinn.dev/user/new', values)
                .then(result => {
                    alert(JSON.stringify(result, null, 2));
                    setIsLoading('done')

                })
                .catch(error => {
                    alert("PIZDEC")
                    setIsLoading(false)
                })

            console.log(response.data)
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Ваши данные
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
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
                        value={formik.values.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading||formik.errors.name||formik.errors.surname}

                        >
                            Обновить информацию
                        </Button>
                </form>
            </div>

        </Container>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        isLogining: state.profile.isLogining
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userUpdate: (name,surname,password) => dispatch({type: 'USER_UPDATE', payload: { name,surname,password}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
