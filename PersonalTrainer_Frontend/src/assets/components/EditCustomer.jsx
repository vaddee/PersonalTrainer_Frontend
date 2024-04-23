import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props){

    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
        setCustomer({


            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        });
    }

    const handleSave = () => {
        console.log("edit: succesful");
        props.updateCustomer(props.params.data._links.customer.href, customer);
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return(
        <>
        <Button onClick={handleClickOpen}>Edit customer</Button>
    
    <Dialog open={open}>
        <DialogTitle>
            Edit customer
        </DialogTitle>
        <DialogContent>
            <TextField
                margin='dense'
                label="firstname"
                value={customer.firstname}
                onChange={ (e) => setCustomer({...customer, firstname: e.target.value})}
                variant="standard">
            </TextField>
            <TextField
                margin="dense"
                label="lastname"
                value={customer.lastname}
                onChange={ (e) => setCustomer({...customer, lastname: e.target.value})}
                variant="standard">
            </TextField>
            <TextField
                margin="dense"
                label="streetaddress"
                value={customer.streetaddress}
                onChange={ (e) => setCustomer({...customer, streetaddress: e.target.value})}
                variant="standard">
            </TextField>
            <TextField
                margin="dense"
                label="postcode"
                value={customer.postcode}
                onChange={ (e) => setCustomer({...customer, postcode: e.target.value})}
                variant="standard">
            </TextField>
    <TextField
                margin="dense"
                label="city"
                value={customer.city}
                onChange={ (e) => setCustomer({...customer, city: e.target.value})}
                variant="standard">
            </TextField>
            <TextField
                margin="dense"
                label="email"
                value={customer.email}
                onChange={ (e) => setCustomer({...customer, email: e.target.value})}
                variant="standard">
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>Save edited</Button>
            <Button onClick={handleCancel}>Cancel</Button> 
        </DialogActions>
    </Dialog>
        </>
    )}
    
