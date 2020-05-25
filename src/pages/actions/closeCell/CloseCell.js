import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import MouseIcon from '@material-ui/icons/Mouse';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CreateIcon from '@material-ui/icons/Create';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import DescriptionIcon from '@material-ui/icons/Description';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";


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


function cellIcon(cell_type) {
    switch (cell_type) {
        case 1:
            return (
                <LaptopMacIcon />
            );
        case 2:
            return (
                <DescriptionIcon />

            );
        case 3:
            return (
                <MouseIcon />

            );
        case 4:
            return (
                <KeyboardIcon />

            );
        case 5:
            return (
                <CreateIcon />

            );
        default:
            return 'Unknown';
    }

}
export default function FullWidthGrid() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)

    const formikTake = useFormik({
        initialValues: {
            take_code: "",
        },
        onSubmit: values => {
            setIsLoading(true)
            axios.post(`https://api.noirdjinn.dev/lease/take_equipment?code=${values.take_code}`)
                .then(result => {
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log("произошла ошибка:", error)
                    setIsLoading(false)
                })

        },
    });

    const formikReturn = useFormik({
        initialValues: {
            return_code: "",
        },
        onSubmit: values => {
            setIsLoading(true)
            axios.post(`https://api.noirdjinn.dev/lease/return_equipment?code=${values.return_code}`)
                .then(result => {
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log("произошла ошибка:", error)
                    setIsLoading(false)
                })
        },
    });
        return (
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
        );

}
