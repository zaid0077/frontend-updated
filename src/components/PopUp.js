import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@material-ui/core'

export default function PopUp({ openPopup, setOpenPopup, title, children }) {
        return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div>
                    <Typography variant="h4" component="div">
                        {title}
                    </Typography>
                </div>
            </DialogTitle>

            <DialogContent>
                <div>
                    {children}
                </div>
                <div style={{marginTop: '10px', marginBottom: '20px'}}>
                <Button
                    onClick={() => setOpenPopup(false)}
                    style={{ width: '90%', borderRadius: '10' }}
                    variant="outlined"
                    color="primary">
                    Close
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
