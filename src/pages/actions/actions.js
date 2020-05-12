import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexDirection: 'column',
        flexGrow: 1,
    },
    Button: {
        paddingTop: theme.spacing(2),
    },
    link:{
          display:"flex",
            width:'100%',
        }
}));

const cards = [
    {id: 0, root: 'all', title: 'Взять', href: '/database', lid: 'Выбор и бронирование необходимого оборудования.'},
    {id: 1, root: 'all', title: 'Оставить', href: '/statistics', lid: 'Получи код для доступа к пустой ячейке. Передай код другу для получения.'},
    {id: 2, root: 'admin', title: 'База данных', href: '/database', lid: 'Просмотр, удаление/добавление, изменение прав доступа.'},
    {id: 3, root: 'admin', title: 'Статистика', href: '/statistics', lid: 'Просмотр статистики использования оборудования.'},
];


function Actions() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (

                        <Grid item key={card.id} xs={12} sm={6} md={4}>
                            <Link to={card.href} className={classes.link}>
                            <Card className={classes.card}>

                                    <Button size="large" color="primary" className={classes.Button}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                    </Button>
                                <CardContent className={classes.cardContent}>
                                        <Typography>
                                        {card.lid}
                                        </Typography>
                                </CardContent>

                            </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded
    }
}

export default connect(mapStateToProps)(Actions)