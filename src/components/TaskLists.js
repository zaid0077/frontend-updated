import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, ListItemSecondaryAction, TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Notification from './Notification';
import ConfirmDialog from './ConfirmDialog';
import PopUp from './PopUp';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import Spinner from './Spinner';
import { dashboardData } from '../actions'
import { useDispatch } from 'react-redux'
import RestResource from '../services/DataService';
const service = new RestResource();


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    cardRoot: {
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        marginTop: 10
    },
    completedText: {
        textDecoration: 'line-through'
    },

    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));



const TaskLists = ({ data }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [search, setSearch] = useState("")
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openEditDialog, setOpenEditDialog] = useState({ isOpen: false })
    const [loading, setLoading] = useState(false)


    const deleteTask = (taskId) => {
        setLoading(true)
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        service.deleteTask(taskId).then(res => {
            service.getDashboardData().then(res => {
                dispatch(dashboardData(res.data))
                setNotify({
                    isOpen: true,
                    message: 'Successfully Deleted',
                    type: 'error'
                })
            })
        })
        setLoading(false)
    }

    const handleToggle = (value) => () => {
        setLoading(true)
        let toUpdate = value.completed == true ? false : true
        service.changeTaskStatus({ id: value._id, toUpdate }).then(res => {
            service.getDashboardData().then(res => {
                dispatch(dashboardData(res.data))
                setNotify({
                    isOpen: true,
                    message: 'Success',
                    type: 'success'
                })
            })
        })
        setLoading(false)
    };

    return (
        <div>
            <div style={{justifyContent: 'center'}}>
            <Spinner loading={loading} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    style={{ marginBottom: '10px', borderRadius: '20px' }}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    label="Search"
                    variant="outlined" />

                <Button
                    onClick={() => setOpenPopup(true)}
                    style={{ height: '55px', borderRadius: '10px', marginLeft: '20px' }}
                    variant="contained"
                    color="primary">
                    + New Task
                </Button>

            </div>
            <List className={classes.root}>
                {
                    data.taskList.filter((value) => {
                        if (search == "") {
                            return value
                        } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                            return value
                        }
                    }).map((value, index) => {
                        return (
                            <ListItem divider key={value.Id} role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={value.completed}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={handleToggle}
                                    />
                                </ListItemIcon>
                                <ListItemText key={value.Id} className={value.completed == true ? classes.completedText : ''} primary={value.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end">
                                        <DeleteIcon onClick={() => setConfirmDialog({
                                            isOpen: true,
                                            title: 'Confirm Delete?',
                                            subTitle: 'Are you sure you want to delete this?',
                                            onConfirm: () => { deleteTask(value._id) }

                                        })} />
                                    </IconButton>
                                    <IconButton edge="end">
                                    <EditIcon onClick={() => setOpenEditDialog({
                                            isOpen: true,
                                            data: {value}

                                        })} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })
                }
            </List>

            <PopUp title="Add Task" openPopup={openPopup} setOpenPopup={setOpenPopup} >
                <AddTaskForm />
            </PopUp>

            <Notification notify={notify} setNotify={setNotify} />

            <ConfirmDialog confirmDailog={confirmDialog} setConfirmDialog={setConfirmDialog} />

            <EditTaskForm openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} />

        </div>
    )
}


export default TaskLists
