import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import Paper from "@material-ui/core/Paper";
import WidgetsIcon from '@material-ui/icons/Widgets';


function AcceptRent(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [rentResult, setRentResult] = useState({})

    useEffect(() => {

        const response = axios.post(`https://api.noirdjinn.dev/lease/new?token=${props.user.token}&cell_type=${props.item.id}`)
            .then(result => {
                setIsLoading(true)
                console.log("Запрос аренды", result)
                setRentResult(result.data)

            })
            .catch(error => {
                console.log("произошла ошибка", error)
                setIsLoading(true)
                setIsError(true)
            })

        console.log(response.data)
    }, [])

    if (!isLoading) {
        return (
            <React.Fragment>
                <Typography
                    variant="h6"
                    align='left'

                >
                    Подтверждаем ваше бронирование и генерируем код доступа..
                </Typography>
                <LinearProgress color="secondary" />

            </React.Fragment>
        )
    }
    else {
        if (isError) {
            return (
                <React.Fragment>
                    <Typography
                        variant="h6"
                        align='left'

                    >
                        Нам очень жаль, но произошла ошибка... Попробуйте снова...
                    </Typography>
                </React.Fragment>
            )
        }
        else {
            return (
                <Paper square elevation={0} >
                    <Typography>Поздравляем, ваше бронирование завершено. Ниже вы найдете код подтверждения,
                        который необходимо ввести при получении и возврате оборудования.</Typography>
                    <Chip
                        color="secondary"
                        icon={<VpnKeyRoundedIcon />}
                        label={`Код подтверждения: ${rentResult.token}`}
                    />
                    <Chip
                        color="primary"
                        icon={<WidgetsIcon />}
                        label={`Номер ячейки: ${rentResult.cell}`}
                    />
                </Paper>
            );
        }
    }
}
// variant="contained" color="primary"


function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
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
export default connect(mapStateToProps,mapDispatchToProps)(AcceptRent)