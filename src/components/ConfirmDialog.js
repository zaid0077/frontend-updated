import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: theme.spacing(5),
        padding: theme.spacing(2)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundClip: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    },
    dialogTitle: {
        textAlign: 'center'
    }
}))

export default function ConfirmDialog({ setConfirmDialog, confirmDailog }) {
    console.log(confirmDailog)
    const classes = useStyles()
    return (
        <Dialog open ={confirmDailog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon  />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDailog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDailog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
            <Button onClick={() => setConfirmDialog({ ...confirmDailog, isOpen:false })} color="primary">No</Button>
            <Button onClick = { confirmDailog.onConfirm } color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
