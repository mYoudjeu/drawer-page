import TextField from "@mui/material/TextField"
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
    useForm,
    SubmitHandler,
} from "react-hook-form";
import { PaymentFormData } from "../context/PaymentForm";
import { usePaymentFormContext } from "../context/PaymentForm";
import PaymentModal from "./PaymentModal";


interface ConfirmPaymentContainerProps {
    paymentAmount: string;
    setIsPaymentInitiated: (payment: boolean) => void;
}

const ConfirmPaymentContainer: React.FC<ConfirmPaymentContainerProps> = ({
    paymentAmount,
    setIsPaymentInitiated
}) => {

    const { t } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const { paymentFormData, setPaymentFormData } = usePaymentFormContext();
    const [validatePayment, setValidatePayment] = useState(false);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { isValid },
        formState: { errors },
    } = useForm<PaymentFormData>({ mode: "onChange" });

    const onSubmit: SubmitHandler<PaymentFormData> = (data) => {
        console.log("Maeva is the best");

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("hiiii", paymentFormData.surname);
    };




    const handleValidation = async () => {
        setValidatePayment(false);
        onSubmit(getValues());
    };

    const handleBack = () => {
        setIsPaymentInitiated(false)
    }



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (

        <form onSubmit={handleSubmit(() => setValidatePayment(true))}>
            <div className="step-wrapper">
                <div className="step-item">
                    <div className="step-circle" style={{ backgroundColor: '#8d8d8d' }}>1</div>
                    <div> {t('steps.step1')}</div>
                </div>
                <div className="step-item">
                    <div className="step-circle" >2</div>
                    <div style={{ color: '#8d8d8d' }}>{t('steps.step2')}</div>
                </div>
            </div>

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
                <div>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="button"
                        color="inherit"
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
                </div>
            </div>
            <PaymentModal state={validatePayment} onClose={() => setValidatePayment(false)} onValidate={handleValidation} paymentAmount={paymentAmount} />


        </form>
    )

}

export default ConfirmPaymentContainer