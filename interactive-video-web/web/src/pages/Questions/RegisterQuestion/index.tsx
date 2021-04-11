import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    createStyles,
    Theme,
    Stepper,
    Step,
    StepLabel,
    Typography
} from '@material-ui/core';

import FormQuestion from './FormQuestion';
import FormAnswer from './FormAnswer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);


function getSteps() {
    return ['Pergunta', 'Respostas'];
}

interface RegisterQuestionProps {
    id: number,
    setId: Function
}
const RegisterQuestion: React.FC<RegisterQuestionProps> = (props) => {
    const [id, setId] = useState(0);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <FormQuestion {...{ id, setId }} />;
            case 1:
                return <FormAnswer {...{ id, setId }} />;
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleStep = (step: number) => () => {
        if (id <= 0) {
            return;
        }
        setActiveStep(step);
    };

    useEffect(() => {
        if (id <= 0) {
            return;
        }
        handleNext()
    }, [id])

    useEffect(() => {
        setId(props.id)
    }, [props.id])

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};

                    return (
                        <Step
                            key={label}
                            {...stepProps}
                            onClick={handleStep(index)}
                        >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                <div>
                    <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                </div>
            </div>
        </div>
    );
};

export default RegisterQuestion;