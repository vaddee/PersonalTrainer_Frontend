import * as React from 'react';
import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog'; 
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';






export default function AddCustomer(props){

    const [customer, setCustomer] = useState({
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
   }

   const handleSave = () => {
    console.log("addcustomer: save a new customer" ); 
    props.addCustomer(customer);
    setOpen(false)
}

const handleCancel = () => {
    setOpen(false)
}

return(
    <>
    <Button onClick={handleClickOpen}>Add customer</Button>

<Dialog open={open}>
    <DialogTitle>
        Add customer
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
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button> 
    </DialogActions>
</Dialog>
    </>
)}
