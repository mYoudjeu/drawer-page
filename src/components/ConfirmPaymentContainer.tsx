import TextField from "@mui/material/TextField"
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePaymentFormContext } from "../context/PaymentForm";
import { Pattern } from "@mui/icons-material";



interface FormData {
    surname: string;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companyAddress: string;
}


const ConfirmPaymentContainer: React.FC = () => {
    const { paymentFormData, setPaymentFormData } = usePaymentFormContext();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentFormData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
        console.log("hiiii", paymentFormData.surname);

    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("hellllloooo", data);

    };



    return (


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
                        size="small"
                        fullWidth
                        {...register("surname", {
                            required: "This field is required",
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "Surname must contain only letters"
                            }
                        })}
                    //value={paymentFormData.surname}
                    />
                    <p style={{ color: "red", marginBottom: "-1px", fontSize: "smaller", marginTop: "-1px" }}>{errors.surname?.message}</p>



                </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label>Name*</label>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <TextField
                    size="small"
                    fullWidth
                    {...register("name", {
                        minLength: {
                            value: 5,
                            message: "Please enter more than 2 characters"
                        },
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Name must contain only letters"
                        }
                    })}

                />
                <p style={{ color: "red", marginBottom: "-1px", fontSize: "smaller", marginTop: "-1px" }}>{errors.name?.message}</p>

            </div>

            <div style={{ marginBottom: '12px' }} >
                <label>Email</label>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <TextField
                    size="small" fullWidth
                    {...register("email", {
                        validate: {
                            maxLength: (v) =>
                                v.length <= 50 || "The email should have at most 50 characters",
                            matchPattern: (v) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                "Email address must be a valid address",
                        }
                    })}
                />
                <p style={{ color: "red", marginBottom: "-1px", fontSize: "smaller", marginTop: "-1px" }}>{errors.email?.message}</p>

            </div>
            <div style={{ marginBottom: '12px' }}>
                <label>Phone Number *</label>
            </div>
            <div style={{ marginBottom: '12px' }} >
                <TextField
                    onChange={handleChange}
                    size="small"
                    fullWidth />
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label>Company Name</label>
            </div>
            <div style={{ marginBottom: '12px' }} >
                <TextField
                    onChange={handleChange}
                    size="small" fullWidth />
            </div>
            <div style={{ marginBottom: '12px' }}>
                <label>Company Address</label>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <TextField
                    onChange={handleChange} size="small" fullWidth />
            </div>

        </div>
    )

}

export default ConfirmPaymentContainer