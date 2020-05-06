import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    primary: {
        marginRight: theme.spacing(2)
    },
    secondary: {
        background: theme.palette.secondary['100'],
        color: 'white'
    },
    spaceTop: {
        marginTop: 20
    }
}));

export default function ButtonBar() {
    const classes = useStyles();


        return (
            <div className={classes.spaceTop}>
                <Button
                    className={classes.primary}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.secondary}
                >
                    Edit
                </Button>
            </div>
        )
}

