import React, { ReactNode, createContext, useContext, useState } from 'react';

interface PaymentFormData {
    surname: string;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companyAddress: string;
}

interface paymentFormProps {
    children: ReactNode
}

interface PaymentFormContextType {
    paymentFormData: PaymentFormData;
    setPaymentFormData: React.Dispatch<React.SetStateAction<PaymentFormData>>;
}

const PaymentFormContext = createContext<PaymentFormContextType | undefined>(undefined);

export const usePaymentFormContext = () => {
    const context = useContext(PaymentFormContext);
    if (!context) {
        throw new Error('usePaymentFormContext must be used within a PaymentFormProvider');
    }
    return context;
};

export const PaymentFormProvider: React.FC<paymentFormProps> = ({ children }) => {
    const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
        surname: '',
        name: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        companyAddress: '',
    });

    return (
        <PaymentFormContext.Provider value={{ paymentFormData, setPaymentFormData }}>
            {children}
        </PaymentFormContext.Provider>
    );
};