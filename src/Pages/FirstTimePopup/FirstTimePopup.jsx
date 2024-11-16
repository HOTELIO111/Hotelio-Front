import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import { isMobile } from 'react-device-detect';

function FirstTimePopup() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("hasSeenPopup", "true");
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
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Box textAlign={'center'}>
                    <Typography fontWeight={700} variant={isMobile ? 'body1' : 'h5'}>
                        Get 999 INR instantly Credit in your account on Sign Up. Also become eligible for refer and earn.
                    </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={3} >
                    <Button size='sm' variant='contained' onClick={copyTextToClipboard} color="error">
                        COPY CODE
                    </Button>
                    <div style={{ border: '3px dotted #ee2e24', padding: '3px' }}>
                        <Typography variant='body1' fontWeight={700} >
                            GET999INR
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button size='small' variant='outlined' onClick={handleClose} color="error">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FirstTimePopup;
