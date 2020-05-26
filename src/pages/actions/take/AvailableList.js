import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
        props.setStatus(true)
        axios.get(`https://api.noirdjinn.dev/cell/current_free_types?token=${props.user.token}`)
        .then(result => {
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
        <React.Fragment>
            <Typography>В данный момент доступно следующее оборудование</Typography>
            <div className={classes.buttonGroup}>
                {AvailableItems.map((item) => (
                        <Button
                            className={classes.button}
                            key={item.id}
                            variant= { choice!==item.id ? "outlined" : "outlined"}
                            color={ choice!==item.id ? "primary" : "secondary"}
                            size="small"
                            onClick={ () =>{
                                props.setStatus(false)
                                props.setRentItem(item)
                                setChoice(item.id)
                            }}
                        >
                            {item.name}
                        </Button>

                    ))}
            </div>
        </React.Fragment>
    );
}
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded,
        item: state.rentItem.item,
        isChosen: state.rentItem.isChosen,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setStatus: (isChosen) => dispatch({type: 'RENT_STATUS_UPDATE', payload: {isChosen}}),
        setRentItem: (item) => dispatch({type: 'SELECT_ITEM', payload: {item}}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AvailableList)