import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import { signIn } from '../actions'
import { useDispatch } from 'react-redux'
import RestResource from '../services/DataService';
const service = new RestResource();

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
        '& .MuiButtonBase-root': {
            width: '90%',
            margin: theme.spacing(1),
            borderRadius: 10
        }
    }
}))


export default function Login() {

    const history = useHistory();
    const classes = useStyle();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push('/dashboard')
        }
    })

    const login = async(e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        }
        try {
            await service.login(data).then(res => {
                console.log(res)
                dispatch(signIn(res.data))
                localStorage.setItem('token', res.data.token)
                history.push('/dashboard')  
            })
        } catch (error) {
            alert('Username and Password Incorrect') 
        }
    }

    return (
        <div className="main-container">
            <div className="container">
                <h2 className="header-text">Login</h2>
                <form className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                label="Email"
                                variant="outlined" />

                            <TextField
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                label="Password"
                                variant="outlined" />

                            <Button
                                onClick={login}
                                style={{ width: '90%', borderRadius: '10' }}
                                variant="contained"
                                color="primary">
                                Login
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}
