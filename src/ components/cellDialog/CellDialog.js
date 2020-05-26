import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    spaceBottom: {
        paddingBottom: theme.spacing(4),
    },
}));

function getData(time) {
    let info = time.slice(0, 10)+' '+time.slice(11, 16)
    return ( info
    );

}

export default function CellDialog(props) {
    const [cellInfo, setCellInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        if (true) {
            axios.get(`https://api.noirdjinn.dev/cell/history?token=${props.token}&cell_id=${props.cell.id}&with_closed=true`)
                .then(result => {
                    setCellInfo(result.data)
                    setIsLoading(true)
                })
                .catch(error => {
                    setIsLoading(true)
                })
        }
    }, [])

    if (!isLoading) {
        return (
            <Dialog
                open={true}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{paddingBottom: '20px'}}>
                    <Typography
                        variant="h6"
                        align='center'
                    >
                        Идет загрузка данных...
                    </Typography>
                    <LinearProgress color="secondary" />
                </DialogContent>
            </Dialog>
        )
    } else {
        if (cellInfo.length === 0) {
            return (
                <Dialog
                    open={true}
                    onClose={props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Информация о использовании ячейки"}
                    </DialogTitle>
                    <DialogContent style={{paddingBottom: '20px'}}>
                        <Typography variant="body1">
                            Эта ячейка ни разу не была забронированна.
                        </Typography>
                    </DialogContent>
                </Dialog>
            )
        }
        else {
            return (
                <Dialog
                    open={true}
                    onClose={props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Информация о использовании ячейки"}
                        <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.spaceBottom}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell>Почта</TableCell>
                                    <TableCell>Начало</TableCell>
                                    <TableCell>Конец</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cellInfo.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.user_name}</TableCell>
                                        <TableCell>{item.user_surname}</TableCell>
                                        <TableCell>{item.user_email}</TableCell>
                                        <TableCell>{getData(item.start_time)}</TableCell>
                                        <TableCell>{item.is_returned ? getData(item.end_time) : "Активна"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
            );
        }


    }


}
