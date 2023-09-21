import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function FirstTimePopup() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const copyTextToClipboard = () => {
        const textToCopy = 'GET999INR';

        // Create a temporary input element to copy the text
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();

        // Execute the copy command
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(tempInput);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>First-Time Popup</DialogTitle> */}
            <DialogContent>
                <DialogContentText>
                    <h3><b>Get 999 INR instantly Credit in your account. Also become eligible for refer and earn.</b></h3>
                </DialogContentText>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <Button size='sm' variant='contained' onClick={copyTextToClipboard} color="primary">
                        COPY CODE
                    </Button>
                    <div style={{ border: '3px dotted #ee2e24', padding: '3px' }}>
                        <b>GET999INR</b>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>

                <Button variant='outlined' onClick={handleClose} color="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FirstTimePopup;
