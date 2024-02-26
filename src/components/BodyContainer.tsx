import TextField from "@mui/material/TextField"
import { Button } from "@mui/material";
import TextFieldBox from "./TextFieldBox"
import TextFieldBox2 from "./TextFieldBox2"
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface BodyContainerProps {
    paymentAmount: string;
    reference: string;
    onPaymentAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onReferenceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPhoneNumberValidation: (isValid: boolean) => void;
}

const BodyContainer: React.FC<BodyContainerProps> = ({
    paymentAmount,
    reference,
    onPaymentAmountChange,
    onReferenceChange,
    onPhoneNumberValidation
}) => {

    const { t } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<boolean>(false);
    const [amountError, setAmountError] = useState("");

    useEffect(() => {
        // Call onPhoneNumberValidation whenever isPhoneNumberValid changes
        onPhoneNumberValidation(isPhoneNumberValid);
    }, [isPhoneNumberValid, onPhoneNumberValidation]);


    const handlePaymentMethodClick = (selectedMethod: string) => {
        setPaymentMethod(selectedMethod);
        setErrorMessage("");
        setPhoneNumber("");
        setIsPhoneNumberValid(false);
        setSelectedPaymentMethod(true)
    };


    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const number = event.target.value;
        setPhoneNumber(number);

        if (paymentMethod === t("paymentMethod.mtn")) {
            // Validation for MTN Mobile Money
            const mtnRegex = /^(6(50|51|52|53|54|7(0|1|2|3|4|8(0|1|2|3)|[67])))\d{6}$/;
            setIsPhoneNumberValid(mtnRegex.test(number));
            if (!mtnRegex.test(number)) {
                setErrorMessage("Invalid MTN Mobile Money number format");
            } else {
                setErrorMessage("");
            }
        } else if (paymentMethod === t("paymentMethod.orange")) {
            // Validation for Orange Money
            const orangeRegex = /^(65(5|6|7|8|90|91|92|93|94|95|9|69))\d{6}$/;
            setIsPhoneNumberValid(orangeRegex.test(number)); // Set validity based on regex test
            if (!orangeRegex.test(number)) {
                setErrorMessage("Invalid Orange Money number format");
            } else {
                setErrorMessage("");
            }
        }
    };

    const handlePaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value;

        const isNumeric = /^[0-9]*$/.test(amount);
        if (isNumeric || amount === "") { // Accept empty string as well
            setAmountError("");
            onPaymentAmountChange(event);
        } else {
            setAmountError("Please enter only numbers");
        }
    };




    return (

        <form>
            <div style={{ marginTop: '30px' }}>
                <div style={{ fontFamily: 'fangsong' }}>
                    <h2>{t('payment.details')} </h2>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: '10px' }}>{t('body.paymentAmount')}</label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        size="small"
                        fullWidth
                        value={paymentAmount}
                        onChange={handlePaymentAmountChange}
                    />
                    {amountError && <div style={{ color: "red" }}>{amountError}</div>}
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: '10px' }}>{t('body.reference')}</label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        size="small"
                        fullWidth
                        value={reference}
                        onChange={onReferenceChange}
                    />
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
                {paymentMethod && (<div className="form-group" style={{ marginTop: '25px', display: 'block' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>{t('body.enterNumber')}</label>
                    </div>
                    <div>
                        <TextField
                            error={!isPhoneNumberValid}
                            fullWidth size="small" value={phoneNumber} onChange={handleChangePhoneNumber} />
                        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    </div>
                </div>
                )}


            </div>
        </form>
    )

}

export default BodyContainer