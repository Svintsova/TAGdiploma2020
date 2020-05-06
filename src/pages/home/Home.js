import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        marginTop: theme.spacing(6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));


export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment >
                <Container maxWidth="sm" className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Добро пожаловать!
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Вы находитесь на стартовой странице веб-приложения, выполненного в
                        рамках ВКР "Автоматизированная система выдачи оборудования".

                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Link to='/dashboard'>
                                    <Button variant="contained" color="primary">
                                    Список действий
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/history'>
                                    <Button variant="outlined" color="primary">
                                    История бронирований
                                     </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
        </React.Fragment>
    );
}