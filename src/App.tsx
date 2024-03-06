import React, { useState } from 'react';
import './App.css'
import Header from './components/Header'
import ImageContainer from './components/ImageContainer'
import BodyContainer from './components/BodyContainer'
import ConfirmPaymentContainer from './components/ConfirmPaymentContainer'
import { PaymentFormProvider } from './context/PaymentForm';

function App() {
  const [isPaymentInitiated, setIsPaymentInitiated] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [steps, setSteps] = useState<1 | 2>(1)



  const handlePaymentAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentAmount(event.target.value);
  };

  return (
    <>
      <PaymentFormProvider>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className='no-display display' style={{ width: '50%' }}>
            <ImageContainer />
          </div>
          <div className='display' >
            <Header />
            <div className='body-container'>
              {steps === 1 && <BodyContainer />}
              {steps === 2 && <ConfirmPaymentContainer />}

              {isPaymentInitiated ? <ConfirmPaymentContainer paymentAmount={paymentAmount} setIsPaymentInitiated={setIsPaymentInitiated} /> : <BodyContainer setIsPaymentInitiated={setIsPaymentInitiated}
                onPaymentAmountChange={handlePaymentAmountChange}

              />}
            </div>
          </div>
        </div>
      </PaymentFormProvider>


    </>
  )
}

export default App
