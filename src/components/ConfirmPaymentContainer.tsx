import TextField from "@mui/material/TextField"
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


interface ConfirmPaymentContainerProps {
    paymentAmount: string;
    reference: string;
}

interface FormData {
    surname: string;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companyAddress: string;
}


const ConfirmPaymentContainer: React.FC<ConfirmPaymentContainerProps> = ({
    reference
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const handleValidSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        const surname = event.target.value;

        const isString = /^[a-zA-Z]+$/.test(surname.trim());


    };



    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div style={{ marginTop: '30px' }}>

                <div style={{ fontFamily: 'fangsong' }}>
                    <h2>We want to know more about you. </h2>
                </div>
                <div style={{ padding: ' 12px 0  ' }}>
                    <div style={{ marginBottom: '12px' }}>
                        <label > Surname*</label>
                    </div>
                    <div  >
                        <TextField
                            onChange={handleValidSurname}
                            size="small" fullWidth />
                    </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label>Name*</label>
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <TextField size="small" fullWidth value={reference} />
                </div>

                <div style={{ marginBottom: '12px' }} >
                    <label>Email</label>
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <TextField size="small" fullWidth />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label>Phone Number *</label>
                </div>
                <div style={{ marginBottom: '12px' }} >
                    <TextField size="small" fullWidth />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label>Company Name</label>
                </div>
                <div style={{ marginBottom: '12px' }} >
                    <TextField size="small" fullWidth />
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <label>Company Address</label>
                </div>
                <div style={{ marginBottom: '12px' }}>
                    <TextField size="small" fullWidth />
                </div>

            </div>
        </form>
    )

}

export default ConfirmPaymentContainer