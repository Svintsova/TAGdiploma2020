import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
    },
}));

export default function CloseCell() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [alertError,setAlertError] = useState("no")

    const formikTake = useFormik({
        initialValues: {
            take_code: "",
        },
        onSubmit: (values, actions) => {
            setIsLoading(true)
            axios.post(`https://api.noirdjinn.dev/lease/take_equipment?code=${values.take_code}`)
                .then(result => {
                    setIsLoading(false)
                    actions.resetForm()
                })
                .catch(error => {
                    setIsLoading(false)
                    setAlertError(`При попытке взять оборудование произошла ошибка: ${error.response.data.err}`)
                })

        },
    });

    const formikReturn = useFormik({
        initialValues: {
            return_code: "",
        },
        onSubmit: (values, actions) => {
            setIsLoading(true)
            axios.post(`https://api.noirdjinn.dev/lease/return_equipment?code=${values.return_code}`)
                .then(result => {
                    setIsLoading(false)
                    actions.resetForm()
                })
                .catch(error => {
                    setAlertError(`При возврате произошла ошибка: ${error.response.data.err}`)
                    setIsLoading(false)
                })
        },
    });
        return (
            <React.Fragment>
            {alertError==="no" ? null : <Alert onClose={() => {setAlertError("no")}} severity="error">{alertError}</Alert>}
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}  >
                    <Typography variant="h5">
                        Взять оборудование
                    </Typography>
                    <form className={classes.form} onSubmit={formikTake.handleSubmit} >
                        <TextField
                            id="take_code"
                            variant="outlined"
                            label="Пин-код"
                            margin="normal"
                            required
                            fullWidth
                            onChange={formikTake.handleChange}
                            value={formikTake.values.take_code}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}

                        >
                            Взять
                        </Button>
                    </form>
                </div>
                <div className={classes.paper}  >
                    <Typography variant="h5">
                        Вернуть оборудование
                    </Typography>
                    <form className={classes.form} onSubmit={formikReturn.handleSubmit} >
                        <TextField
                            id="return_code"
                            variant="outlined"
                            label="Пин-код"
                            margin="normal"
                            required
                            fullWidth
                            onChange={formikReturn.handleChange}
                            value={formikReturn.values.return_code}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}


                        >
                            Вернуть
                        </Button>
                    </form>
                </div>
            </Container>
                </React.Fragment>
        );

}
