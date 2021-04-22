import React,{ useEffect, useState, useContext } from 'react'
import { Grid, Paper, Card, CardContent, Typography, Checkbox, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from '../Context/TaskContext'
import TaskCard from './TaskCard'

const useStyles = makeStyles({
    paper:{
        height:'100vh',
        width:'100vw',
        borderRadius:'0',
        padding:'2em'
    },
    container:{
        marginTop:'3em'
    }
})
function Tasks() {
    const classes = useStyles();
    const { taskListInfo, setTaskListInfo } = useContext(TaskContext)
    
    useEffect(() => {
        let savedTaskList = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskList && savedTaskList !== []){
            setTaskListInfo(savedTaskList)
        }
    },[])
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h2'>Task Lists</Typography>
                    </Grid>

                </Grid>
                <Grid container className={classes.container} spacing={5}>
                    {taskListInfo.map((item,index) => (
                            <TaskCard item={item} index={index}/>
                    ))}
                </Grid>
            </Paper>
        </>
    )
}

export default Tasks
