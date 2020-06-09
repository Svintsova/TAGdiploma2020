import React, {useEffect, useState} from 'react';
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
import CellDialog from "../../../ components/cellDialog/CellDialog";
import {connect} from "react-redux";

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
function CellStatus(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [cellList, setCellList] = useState({})
    const [open, setOpen] = React.useState(false);
    const [selectedCell, setSelectedCell] = useState({})

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
                            <Button
                                aria-describedby={cell.id}
                                variant="outlined"
                                color={!cell.is_taken ? "primary" : cell.is_empty ? "secondary" : "default"}
                                startIcon={cellIcon(cell.cell_type_id)}
                                onClick={() => {
                                    setOpen(true)
                                    setSelectedCell(cell)
                                }}

                            >
                                № {cell.id}
                            </Button>


                        </Grid>
                    ))}
                </Grid>
                {open ? <CellDialog token={props.user.token} cell={selectedCell} onClose={() => setOpen(false)} /> : null}
            </Container>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.profile.user,
    }
}

export default connect(mapStateToProps)(CellStatus)