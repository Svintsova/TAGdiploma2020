import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
    }
}));

const cards = [
    {id: 0, title: 'Взять', href: '/database', lid: 'Выбор и бронирование необходимого оборудования.'},
    {id: 1, title: 'Оставить', href: '/statistics', lid: 'Зарезервировать ячейку под документы.'},
    {id: 2, title: 'База данных', href: '/profile', lid: 'Просмотр, удаление/добавление, изменение прав доступа.'},
    {id: 3, title: 'Статистика', href: '/actions', lid: 'Просмотр статистики использования оборудования.'},
];


export default function Actions() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4}>
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
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}