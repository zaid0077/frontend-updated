import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core';
import Notification from './Notification';
import { makeStyles } from '@material-ui/core/styles';
import { dashboardData } from '../actions'
import { useDispatch } from 'react-redux'
import RestResource from '../services/DataService';
const service = new RestResource();



const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '50%',
            margin: theme.spacing(2)
        }
    }
}))

const initialValue = {
    taskName: '',
}

export default function AddTaskForm(props) {
    const [values, setValues] = useState(initialValue)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [error, setError] = useState({})
    const classes = useStyle()
    const dispatch = useDispatch();

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const validate = () => {
        let temp = {}
        temp.taskName = values.taskName ? "" : "Task Name is required"
        setError({
            ...temp
        })
        return Object.values(temp).every(x => x == "") // in case we have more than one fields to validate
    }

    const handleSubmit = e => {
        if (validate()) {
            e.preventDefault();
            service.saveTask({ name: values.taskName }).then(res => {
                service.getDashboardData().then(res => {
                    console.log(res)
                    dispatch(dashboardData(res.data))
                    setValues(initialValue)
                    setNotify({
                        isOpen: true,
                        message: 'Successfully Added Task',
                        type: 'success'
                    })
                })
            })
        } else {
            setNotify({
                isOpen: true,
                message: 'Task Name is required',
                type: 'error'
            })
        }
    }

    return (
        <form>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleInputChange}
                        value={values.taskName}
                        style={{ width: '90%', marginBottom: '10px' }}
                        label="Task Name"
                        name="taskName"
                        error={values.taskName === ""}
                        helperText={values.taskName === "" ? "Task Name is required" : ""}
                        variant="outlined"
                    />

                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleSubmit}
                        style={{ width: '90%', borderRadius: '10' }}
                        variant="contained"
                        color="primary">
                        Add Task
                    </Button>
                </Grid>
            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
        </form>
    )
}