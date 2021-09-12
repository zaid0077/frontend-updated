import React from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

export default function Notification({ notify, setNotify }) {

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <div>
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={notify.type}>
                    {notify.message}
                </Alert >
            </Snackbar>
        </div>
    )
}
