import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddTrainingToCustomer(props) {
    const [training, setTraining] = useState({
        activity: '',
        date: '',
        duration: '',
        customer: null
        
    });

    // open = false, when the dialog is closed
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            customer: props.params.data._links.customer.href
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    

    const handleSave = () => {
        console.log("Adding training:", training);
    
        // Call the function to add training to the customer
        props.addTrainingToCustomer(training); // Ensure training object includes customer link
    
        // Close the dialog
        handleClose();
    };
    
    
    
    

    return (
        <>
            <Button onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="datetime-local"
                        value={training.date}
                        onChange={(e) => setTraining({ ...training, date: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
