import React, { useState } from 'react';
import './App.css'
import Header from './components/Header'
import ImageContainer from './components/ImageContainer'
import BodyContainer from './components/BodyContainer'
import ConfirmPaymentContainer from './components/ConfirmPaymentContainer'
import HorizontalLinearStepper from './components/HorizontalLinearStepper';

function App() {
  const [isPaymentInitiated, setIsPaymentInitiated] = useState<boolean>(false);

  return (
    <>
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



    </>
  )
}

export default App
