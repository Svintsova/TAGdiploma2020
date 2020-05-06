import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom'

export const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },

}));




export const NavBar = () => {
    const classes = useStyles();

    return (

        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    TAKE & GO
                </Typography>
                <nav>
                    <RouterLink to="/dashboard">
                        <Link variant="button" color="textPrimary" href="/dashboard" className={classes.link}>
                        Действия
                        </Link>
                    </RouterLink>

                    <RouterLink to="/history">
                        <Link variant="button" color="textPrimary" href="/history" className={classes.link}>
                            История
                        </Link>
                    </RouterLink>

                    <RouterLink to="/profile">
                        <Link variant="button" color="textPrimary" href="/profile" className={classes.link}>
                        Профиль
                        </Link>
                    </RouterLink>
                </nav>
                <RouterLink to="/">
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                    Выход
                    </Button>
                </RouterLink>
            </Toolbar>
        </AppBar>

    );
}
