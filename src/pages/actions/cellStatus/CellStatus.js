import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../ components/Loader/Loader";
import MouseIcon from '@material-ui/icons/Mouse';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CreateIcon from '@material-ui/icons/Create';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import DescriptionIcon from '@material-ui/icons/Description';
import Container from "@material-ui/core/Container";

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperFree: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    },
    paperBusy: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.error.light,
    },
    typography: {
        padding: theme.spacing(2),
    },
    buttonWidth: {
        minWidth: '58px',
        boxSizing: "border-box"
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
    const [cellList, setCellList] = useState({})

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    useEffect(() => {
        axios.get(`https://api.noirdjinn.dev/cell/statuses`)
            .then(result => {
                setCellList(result.data)
                setIsLoading(true)


            })
            .catch(error => {
                alert(error)
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
            <Container component="main" maxWidth="md">
                <Grid container spacing={3}>
                    {cellList.map((cell,index) => (
                        <Grid item xs={6} sm={3} key={cell.id}>
                            {/*<Paper*/}

                            {/*    className={cell.is_taken ? classes.paperBusy : classes.paperFree }*/}
                            {/*>*/}

                            {/*    <Typography> № {cell.id} </Typography>*/}
                            {/*    {cellIcon(cell.cell_type_id)}*/}
                            {/*</Paper>*/}


                            <Button
                                aria-describedby={cell.id}
                                variant="outlined"
                                color={cell.is_taken ? "secondary" : "primary" }
                                onClick={handleClick}
                                startIcon={cellIcon(cell.cell_type_id)}

                            >
                                № {cell.id}
                            </Button>


                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
