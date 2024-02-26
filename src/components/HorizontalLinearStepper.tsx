import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BodyContainer from './BodyContainer';
import ConfirmPaymentContainer from './ConfirmPaymentContainer';
import PaymentModal from './PaymentModal';

const steps = ['Check Payment', 'Confirm Payment'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [reference, setReference] = useState("");
    const [skipped, setSkipped] = useState(new Set<number>());
    const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState<boolean>(false);

    const isStepOptional = (step: number) => {
        return false; // No step is optional
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (parseInt(paymentAmount) < 50) {
            alert("Sorry, the amount cannot be less than 50FCFA");
            return;
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setPaymentAmount("");
        setReference("");
    };

    const handlePaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentAmount(event.target.value);
    };

    const handleReferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReference(event.target.value);
    };

    const handlePhoneNumberValidation = (isValid: boolean) => {
        setIsPhoneNumberValid(isValid);
    };



    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps} >{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <div style={{ width: '1000px' }}>
                    <PaymentModal
                        paymentAmount={paymentAmount} />
                </div>
            ) : (
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <div style={{ width: '-webkit-fill-available' }}>
                            {activeStep === 0 ? (
                                <BodyContainer
                                    paymentAmount={paymentAmount}
                                    reference={reference}
                                    onPaymentAmountChange={handlePaymentAmountChange}
                                    onReferenceChange={handleReferenceChange}
                                    onPhoneNumberValidation={handlePhoneNumberValidation}
                                />
                            ) : (
                                <ConfirmPaymentContainer
                                    paymentAmount={paymentAmount}
                                    reference={reference}
                                />
                            )}
                            <div>
                                {activeStep === 0 ? null : (
                                    <Button
                                        fullWidth
                                        size="small"
                                        variant="contained"
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    disabled={!isPhoneNumberValid || paymentAmount === ""}
                                    sx={{ marginTop: '30px' }}
                                    onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? `Pay ${paymentAmount} FCFA` : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
