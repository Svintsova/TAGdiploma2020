import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import axios from "axios";
import Loader from "../../../ components/Loader/Loader";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        padding: theme.spacing(2),
    },
    button: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },

}));



function AvailableList(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [choice, setChoice] = useState(0)
    const [AvailableItems, setAvailableItems] = useState({})

    useEffect(() => {
    axios.get(`https://api.noirdjinn.dev/cell/cell_types_available?token=${props.user.token}`)
        .then(result => {
            console.log('List', result);
            setAvailableItems(result.data)
            setIsLoading(true)
        })
        .catch(error => {
            console.log("Произошла ошибка:", error)
            setIsLoading(true)
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
        <div className={classes.buttonGroup}>
            {AvailableItems.map((item) => (
                    <Button
                        className={classes.button}
                        key={item.id}
                        variant= { choice!==item.id ? "outlined" : "outlined"}
                        color={ choice!==item.id ? "primary" : "secondary"}
                        size="small"
                        onClick={() => {
                            console.log(item.id)
                            setChoice(item.id)
                        }}
                    >
                        {item.name}
                    </Button>

                ))}
        </div>
    );
}
}
// variant="contained" color="primary"


function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded
    }
}

export default connect(mapStateToProps)(AvailableList)