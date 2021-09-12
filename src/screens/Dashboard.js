import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CardList from '../components/CardList'
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Notification from '../components/Notification';
import TaskLists from '../components/TaskLists'
import { dashboardData } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import RestResource from '../services/DataService';
const service = new RestResource();


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    gridContainer: {
        marginTop: "50px",
        paddingLeft: "15%",
        paddingRight: "15%"
    },
}));


const Dashboard = () => {
    const history = useHistory();
    const classes = useStyles();
    const taskListData = useSelector(state => state.dashboardData)
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState()
    const [newTask, setNewTask] = useState('')
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getDashboardData()
        } else {
            history.push('/login')  
        }
    }, [])


    const getDashboardData = async () => {
        await service.getDashboardData().then(res => {
            dispatch(dashboardData(res.data))
            setLoading(true)
        })
    }

    const addTask = () => {
         service.saveTask({ name: newTask }).then(res => {
            service.getDashboardData().then(res => {
                dispatch(dashboardData(res.data))
                setLoading(true)
                setNewTask('')
                setNotify({
                    isOpen: true,
                    message: 'Success',
                    type: 'success'
                })
            })
        })
    }

    return (
        <div>
            <Header />
            <Notification notify={notify} setNotify={setNotify} />
            {
                (loading && taskListData.taskList.length > 0) ?
                    <div>
                        <CardList data={taskListData} />
                        <div>
                            <h2 style={{ paddingLeft: '15%', marginTop: '50px' }}>Tasks</h2>
                        </div>

                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <TaskLists data={taskListData} />
                            </Grid>
                        </Grid>

                    </div> :
                    <div>
                        <div className="main-container">
                            <div className="container">
                                <h2 className="header-text">+ New Task</h2>
                                <form className={classes.root}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={(e) => setNewTask(e.target.value)}
                                                value={newTask}
                                                style={{ width: '90%', marginBottom: '10px' }}
                                                label="Task Name"
                                                variant="outlined" />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                onClick={addTask}
                                                style={{ width: '90%', borderRadius: '10' }}
                                                variant="contained"
                                                color="primary">
                                                Add Task
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}


export default Dashboard