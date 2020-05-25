import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import AvailableList from "./AvailableList";
import AcceptRent from "./AcceptRent";

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
            return (
                <Typography>Выберите оборудование для аренды. Обращаем ваше внимание,
            что для бронирования нескольких объектов, вам необходимо получить код на каждый из них.</Typography>);
        case 1:
            return (
                    <AvailableList />
            );
        case 2:
            return (
                <AcceptRent />

            );

        default:
            return 'Unknown step';
    }
}

function TakeStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        props.setStatus(false)
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
                            {getStepContent(index, setActiveStep)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    {activeStep === steps.length - 1 ? null :
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button> }
                                    <Button
                                        variant="contained"
                                        color={activeStep === steps.length - 1 ? 'default' : 'primary'}
                                        onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
                                        className={classes.button}
                                        disabled={props.isChosen}
                                    >
                                        {activeStep === steps.length - 1 ? 'Повторить' : 'Далее'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        user: state.profile.user,
        loading: state.profile.loading,
        IsLoaded: state.profile.IsLoaded,
        item: state.rentItem.item,
        isChosen: state.rentItem.isChosen,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setStatus: (isChosen) => dispatch({type: 'RENT_STATUS_UPDATE', payload: {isChosen}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TakeStepper)