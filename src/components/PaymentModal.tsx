import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PaymentAmount {
    paymentAmount: string;
    state: boolean,
    onClose: () => void,
    onValidate: () => void

}

const PaymentModal: React.FC<PaymentAmount> = ({
    paymentAmount,
    state,
    onClose,
    onValidate
}) => {
    return (
        <Dialog
            open={state}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                {"Confirmer le paiement"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <label style={{ color: 'black' }}>Sous-Total</label>
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>{paymentAmount}FCFA</label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <label style={{ color: 'red' }}>Frais</label>
                        </div>
                        <div>
                            <label style={{ color: 'red' }}>{parseFloat(paymentAmount) * 0.1} FCFA</label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <label style={{ color: 'black' }}>Total</label>
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>{parseFloat(paymentAmount) + parseFloat(paymentAmount) * 0.01} FCFA</label>                                </div>
                    </div>

                    <div className='dashes'> </div>

                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-between' }}>
                <Button variant='contained' onClick={onClose} sx={{ color: 'black' }} >Anuller</Button>
                <Button variant='contained' onClick={onValidate} autoFocus>
                    Oui
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PaymentModal
