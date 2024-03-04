import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BodyContainer from "./BodyContainer";
import ConfirmPaymentContainer from "./ConfirmPaymentContainer";
import PaymentModal from "./PaymentModal";
import { usePaymentFormContext } from "../context/PaymentForm";
import {
    useForm,
    useFormState,
    FormState,
    SubmitHandler,
} from "react-hook-form";
import { PaymentFormData } from "../context/PaymentForm";
import TextField from "@mui/material/TextField";

const steps = ["Check Payment", "Confirm Payment"];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [validatePayment, setValidatePayment] = useState(false);
    const [reference, setReference] = useState("");
    const [skipped, setSkipped] = useState(new Set<number>());
    const [isPhoneNumberValid, setIsPhoneNumberValid] =
        React.useState<boolean>(false);
    const { paymentFormData, setPaymentFormData } = usePaymentFormContext();
    const {
        handleSubmit,
        register,
        getValues,
        formState: { isValid },
        formState: { errors },
    } = useForm<PaymentFormData>();

    const isStepOptional = (step: number) => {
        return false; // No step is optional
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const onSubmit: SubmitHandler<PaymentFormData> = (data) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleNext = async () => {
        /**  if (parseInt(paymentAmount) < 50) {
             alert("Sorry, the amount cannot be less than 50FCFA");
             return;
         }*/

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleValidation = async () => {
        setValidatePayment(false);
        onSubmit(getValues());
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlePaymentAmountChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPaymentAmount(event.target.value);
    };

    const handleReferenceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReference(event.target.value);
    };

    const handlePhoneNumberValidation = (isValid: boolean) => {
        setIsPhoneNumberValid(isValid);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("hiiii", paymentFormData.surname);
    };

    return (
        <Box sx={{ width: "100%" }}>
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
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <div>
                    <h1> CONGRATULATIONS </h1>

                </div>

            ) : (
                <>
                    <form onSubmit={handleSubmit(() => setValidatePayment(true))}>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <div style={{ width: "-webkit-fill-available" }}>
                                {activeStep === 0 ? (
                                    <BodyContainer
                                        paymentAmount={paymentAmount}
                                        reference={reference}
                                        onPaymentAmountChange={handlePaymentAmountChange}
                                        onReferenceChange={handleReferenceChange}
                                        onPhoneNumberValidation={handlePhoneNumberValidation}
                                    />
                                ) : (
                                    <div style={{ marginTop: "30px" }}>
                                        <div style={{ fontFamily: "fangsong" }}>
                                            <h2>We want to know more about you. </h2>
                                        </div>
                                        <div style={{ padding: " 12px 0  " }}>
                                            <div style={{ marginBottom: "12px" }}>
                                                <label style={errors.surname?.message ? { color: "red" } : { color: "black" }}> Surname*</label>
                                            </div>
                                            <div>
                                                <TextField
                                                    size="small"
                                                    error={errors.surname?.message ? true : false}
                                                    fullWidth
                                                    {...register("surname", {
                                                        required: "This field is required",
                                                        pattern: {
                                                            value: /^[A-Za-z]+$/,
                                                            message: "Surname must contain only letters",
                                                        },
                                                    })}
                                                //value={paymentFormData.surname}
                                                />
                                                <p
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "-1px",
                                                        fontSize: "smaller",
                                                        marginTop: "-1px",
                                                    }}
                                                >
                                                    {errors.surname?.message}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label style={errors.name?.message ? { color: "red" } : { color: "black" }}>Name*</label>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <TextField
                                                size="small"
                                                error={errors.name?.message ? true : false}
                                                fullWidth
                                                {...register("name", {
                                                    minLength: {
                                                        value: 5,
                                                        message: "Please enter more than 2 characters",
                                                    },
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^[A-Za-z]+$/,
                                                        message: "Name must contain only letters",
                                                    },
                                                })}
                                            />
                                            <p
                                                style={{
                                                    color: "red",
                                                    marginBottom: "-1px",
                                                    fontSize: "smaller",
                                                    marginTop: "-1px",
                                                }}
                                            >
                                                {errors.name?.message}
                                            </p>
                                        </div>

                                        <div style={{ marginBottom: "12px" }}>
                                            <label style={errors.email?.message ? { color: "red" } : { color: "black" }}>Email</label>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <TextField
                                                size="small"
                                                error={errors.email?.message ? true : false}
                                                fullWidth
                                                {...register("email", {
                                                    validate: {
                                                        maxLength: (v) =>
                                                            v.length <= 50 ||
                                                            "The email should have at most 50 characters",
                                                        matchPattern: (v) =>
                                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                                v
                                                            ) || "Email address must be a valid address",
                                                    },
                                                })}
                                            />
                                            <p
                                                style={{
                                                    color: "red",
                                                    marginBottom: "-1px",
                                                    fontSize: "smaller",
                                                    marginTop: "-1px",
                                                }}
                                            >
                                                {errors.email?.message}
                                            </p>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label>Phone Number *</label>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <TextField
                                                onChange={handleChange}
                                                size="small"
                                                fullWidth
                                            />
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label>Company Name</label>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <TextField
                                                onChange={handleChange}
                                                size="small"
                                                fullWidth
                                            />
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <label>Company Address</label>
                                        </div>
                                        <div style={{ marginBottom: "12px" }}>
                                            <TextField
                                                onChange={handleChange}
                                                size="small"
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {activeStep === 0 ? (

                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            onClick={handleNext}
                                            disabled={!isPhoneNumberValid || paymentAmount === ""}
                                            sx={{ marginTop: "30px" }}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="contained"
                                                type="button"
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                type="submit"
                                                variant="contained"
                                                sx={{ marginTop: "30px" }}
                                            >

                                                {`Pay ${paymentAmount} FCFA`}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Box>
                    </form>
                </>
            )}

            <PaymentModal state={validatePayment} onClose={() => setValidatePayment(false)} onValidate={handleValidation} paymentAmount={paymentAmount} />
        </Box>
    );
}
