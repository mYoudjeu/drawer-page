import React, { useState } from 'react';
import './App.css'
import Header from './components/Header'
import ImageContainer from './components/ImageContainer'
import HorizontalLinearStepper from './components/HorizontalLinearStepper';
import { PaymentFormProvider } from './context/PaymentForm';

function App() {

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
              <HorizontalLinearStepper />
            </div>
          </div>
        </div>
      </PaymentFormProvider>


    </>
  )
}

export default App
