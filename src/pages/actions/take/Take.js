import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import Loader from "../../../ components/Loader/Loader";
import AvailableList from "./AvailableList";
import Chip from "@material-ui/core/Chip";
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
}));

function getSteps() {
    return ['Правила аренды', 'Выбор оборудования', 'Подтверждение бронирования'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<Typography>Выберите оборудование для аренды. Обращаем ваше внимание,
            что для бронирования нескольких объектов, вам необходимо получить код на каждый из них.</Typography>);
        case 1:
            return (
                <React.Fragment>
                    <Typography>В данный момент доступно следующее оборудование</Typography>
                    <AvailableList/>

                </React.Fragment>
            );
        case 2:
            return (
                <React.Fragment>
                    <Typography>Поздравляем, ваше бронирование завершено. Ниже вы найдете код подтверждения,
                который необходимо ввести при получении и возврате оборудования.</Typography>
                </React.Fragment>

            );

        default:
            return 'Unknown step';
    }
}

function TakeStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container className={classes.root} maxWidth="md">
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Поздравляем, ваше бронирование завершено. Ниже вы найдете код подтверждения,
                        который необходимо ввести при получении и возврате оборудования.</Typography>
                    <Chip color="secondary" icon={<VpnKeyRoundedIcon />}  label="Код подтверждения: 123456" />
                    <Button onClick={handleReset} className={classes.button} variant="outlined">
                        Повторить
                    </Button>
                </Paper>
            )}
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded
    }
}

export default connect(mapStateToProps)(TakeStepper)