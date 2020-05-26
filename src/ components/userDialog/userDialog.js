import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";
import axios from "axios";
import {Alert} from "@material-ui/lab";


export default function UserDialog(props) {
    const [alertError,setAlertError] = useState("no")
    const formik = useFormik({
        initialValues: {
            name: props.user.first_name,
            surname:props.user.last_name,
            id: props.user.id,
            is_admin: props.user.is_admin,
        },
        onSubmit: (values, actions) => {
            if (formik.values.name!==props.user.first_name || formik.values.surname!==props.user.last_name) {
                axios.post(`https://api.noirdjinn.dev/user/update_info?token=${props.user.token}`, values)
                    .then(result => {
                        props.onClose()
                     })
                    .catch(error => {
                        setAlertError(`При обновлении профиля произошла ошибка: ${error.response.data.err}`)
                    })
            }
            if (formik.values.is_admin!==props.user.is_admin) {
                axios.post(`https://api.noirdjinn.dev/user/make_admin?id=${formik.values.id}&token=${props.user.token}&is_admin=${formik.values.is_admin}`)
                    .then(result => {
                        props.onClose()
                    })
                    .catch(error => {
                        setAlertError(`При изменении прав доступа произошла ошибка: ${error.response.data.err}`)
                    })
            }

        },
    });



    return (
            <Dialog
                open = {true}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {alertError==="no" ? null : <Alert onClose={() => {setAlertError("no")}} severity="error">{alertError}</Alert>}
                <form onSubmit={formik.handleSubmit}  >

                <DialogTitle id="alert-dialog-title">{"Редактировать данные"}</DialogTitle>
                <DialogContent>
                            <TextField
                                id="name"
                                variant="outlined"
                                label="Имя"
                                margin="normal"
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
                                required
                                fullWidth
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="is_admin"
                                label="Администратор"
                                value={formik.values.is_admin}
                                onChange={formik.handleChange}
                            />

                </DialogContent>
                <DialogActions style={{paddingBottom:'20px'}}>
                    <Button  color="primary"  onClick={props.onClose}>
                        Закрыть
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        autoFocus
                    >
                        Обновить информацию
                    </Button>
                </DialogActions>
            </form>
            </Dialog>
    );
}



