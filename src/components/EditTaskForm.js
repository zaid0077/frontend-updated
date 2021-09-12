import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Notification from './Notification';
import { dashboardData } from '../actions'
import { useDispatch } from 'react-redux'
import RestResource from '../services/DataService';
const service = new RestResource();


export default function EditTaskForm({ openEditDialog, setOpenEditDialog }) {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const updateTask = (data) => {
        service.updateTask(data).then(res => {
            service.getDashboardData().then(res => {
                dispatch(dashboardData(res.data))
                setNotify({
                    isOpen: true,
                    message: 'Successfully Edited Task',
                    type: 'success'
                })
            })
            setNewTask('')
            setOpenEditDialog({
                ...openEditDialog,
                isOpen: false
            })
    })
}

const handleClose = (event, reason) => {
    setOpenEditDialog({
        ...openEditDialog,
        isOpen: false
    })
}

return (
    <div>
        <Dialog open={openEditDialog.isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Task Name"
                    fullWidth
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => updateTask({ name: newTask, _id: openEditDialog.data.value._id })} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
        <Notification notify={notify} setNotify={setNotify} />
    </div>

)
}
