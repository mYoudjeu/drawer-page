import TextField from "@mui/material/TextField"
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface BodyContainerProps {
    setIsPaymentInitiated: (isInitiated: boolean) => void;
    onPaymentAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

interface Inputs {
    amount: string
    reference: string
    phoneNumber: string
}

const BodyContainer: React.FC<BodyContainerProps> = ({
    setIsPaymentInitiated,
    onPaymentAmountChange,
}) => {

    const { t } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isDirty, isValid, dirtyFields }, } = useForm<Inputs>({ mode: "onChange" })


    const handlePaymentMethodClick = (selectedMethod: string) => {
        setPaymentMethod(selectedMethod);
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setIsPaymentInitiated(true)
        console.log("hi", data);

    }

    const handlePaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPaymentAmountChange(event);
        console.log("dirty fields", dirtyFields);

    };




    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="step-wrapper">
                <div className="step-item">
                    <div className="step-circle">1</div>
                    <div> {t('steps.step1')}</div>
                </div>
                <div className="step-item">
                    <div className="step-circle" style={{ backgroundColor: '#8d8d8d' }}>2</div>
                    <div style={{ color: '#8d8d8d' }}>{t('steps.step2')}</div>
                </div>
            </div>
            <div style={{ marginTop: '30px' }}>
                <div style={{ fontFamily: 'fangsong' }}>
                    <h2>{t('payment.details')} </h2>
                </div>
                <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label style={errors.amount?.message ? { color: "red" } : { color: "black" }}>{t('body.paymentAmount')}</label>
                </div>
                <div style={{ margin: '-7px', marginTop: "0.5px", marginBottom: '10px' }}>
                    <TextField
                        size="small"
                        fullWidth
                        error={errors.amount?.message ? true : false}
                        {...register("amount", {
                            required: "This field is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Amount must contain only numbers",
                            },
                        })}
                        onChange={handlePaymentAmountChange}
                    />
                    <p
                        style={{
                            color: "red",
                            marginBottom: "-1px",
                            fontSize: "smaller",
                            marginTop: "-1px",
                        }}
                    >
                        {errors.amount?.message}
                    </p>
                </div>
                <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label>{t('body.reference')}</label>
                </div>
                <div style={{ margin: '-7px', marginTop: "0.5px" }}>
                    <TextField
                        fullWidth
                        {...register("reference")}
                        size="small" />
                </div>
                <div style={{ fontFamily: 'fangsong' }}>
                    <h2>{t('body.selectPaymentMethod')} </h2>
                </div>

                <div className="payment-Method-wrapper" >
                    <div className="payment-Method" onClick={() => handlePaymentMethodClick(t('paymentMethod.mtn'))}>
                        <img src="/media/mtn.svg" className={paymentMethod === t("paymentMethod.mtn") ? "selected" : ""} />
                        <div className="font" style={{ textAlign: 'center' }}>{t('paymentMethod.mtn')}</div>
                    </div>
                    <div className=" payment-Method" onClick={() => handlePaymentMethodClick(t('paymentMethod.orange'))}>
                        <img src="/media/orange.svg" className={paymentMethod === t("paymentMethod.orange") ? "selected" : ""} />
                        <div className="font" style={{ textAlign: 'center' }}>{t('paymentMethod.orange')}</div>
                    </div>
                    <div className=" payment-Method" onClick={() => handlePaymentMethodClick(t('paymentMethod.expressUnion'))}>
                        <img src="/media/eu.svg" className={paymentMethod === t("paymentMethod.expressUnion") ? "selected" : ""} />
                        <div className="font" style={{ textAlign: 'center' }}>{t('paymentMethod.expressUnion')}</div>
                    </div>
                </div>

                {paymentMethod && (<div className="form-group" style={{ marginTop: '50px', display: 'block' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>{t('body.enterNumber')}</label>
                    </div>
                    <div>
                        <TextField
                            error={errors.phoneNumber?.message ? true : false}
                            fullWidth size="small"
                            {...paymentMethod === t("paymentMethod.mtn") &&
                            {
                                ...register("phoneNumber", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^(6(50|51|52|53|54|7(0|1|2|3|4|8(0|1|2|3)|[67])))\d{6}$/,
                                        message: "Invalid Mobile Money number format",
                                    },
                                })
                            }}
                            {...paymentMethod === t("paymentMethod.orange") &&
                            {
                                ...register("phoneNumber", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^(6(50|51|52|53|54|7(0|1|2|3|4|8(0|1|2|3)|[67])))\d{6}$/,
                                        message: "Invalid Orange Money number format",
                                    },
                                })
                            }}
                            {...paymentMethod === null ?

                                register("phoneNumber", {
                                    required: "This field is required",

                                }) : null
                            }
                        />

                        <p
                            style={{
                                color: "red",
                                marginBottom: "-1px",
                                fontSize: "smaller",
                                marginTop: "-1px",
                            }}
                        >
                            {errors.phoneNumber?.message}
                        </p>
                    </div>
                </div>
                )}

                <div style={{ marginTop: '12px' }}>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="submit"
                    >
                        Initiate Payment
                    </Button>
                </div>
            </div>
        </form>
    )

}

export default BodyContainer