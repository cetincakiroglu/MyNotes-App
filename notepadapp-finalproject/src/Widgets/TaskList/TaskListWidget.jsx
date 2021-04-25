import React, { useContext, useEffect } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import InputGroup from './InputGroup'
import DisplayGroup from './DisplayGroup'

const useStyles = makeStyles({
    paper:{
        marginTop:'1.2em',
        backgroundColor:'#3a3a3a',
        padding:'0.5em'
    },
    wrapper:{
        minHeight:'25em',
        margin:'0 1em'
    }
})

function TaskListWidget() {
    const classes = useStyles();
    const { taskListInfo, setTaskListInfo } = useContext(TaskContext);
   
    useEffect(() => {
        let savedTaskList = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskList && savedTaskList !==[]){
            setTaskListInfo(savedTaskList);
        }
    },[])
    
    return (
        <>
            <Grid item xs={12} md={4}>
                <Typography variant='h3'>Recent Tasks</Typography>
            </Grid> 
           <Paper className={classes.paper} elevation={5}>
            <Grid container justify='space-between'>
                <Grid item xs={12} sm={12} md={5} className={classes.wrapper}>
                    <Grid container spacing={3}>
                       {taskListInfo.slice(0,4).map((item,index) => (
                           <DisplayGroup item={item} index={index} key={index}/>
                       ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className={classes.wrapper}>
                    <InputGroup />
                </Grid>
            </Grid>
           </Paper>
        </>
    )
}

export default TaskListWidget
