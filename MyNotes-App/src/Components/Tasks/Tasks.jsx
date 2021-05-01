import React,{ useEffect, useContext } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from '../Context/TaskContext'
import TaskCard from './TaskCard'
import NewTaskDrawer from './NewTaskDrawer'


const useStyles = makeStyles({
    paper:{
        minHeight:'100vh',
        width:'100vw',
        borderRadius:'0',
        padding:'2em'
    },
    container:{
        marginTop:'3em',
        flexWrap:'wrap',
    },
    button:{
        width:'100%',
        height:'100%'
    },
    message:{
        marginLeft:'25px'
    }
})

function Tasks() {
    const classes = useStyles();
    const { taskListInfo, setTaskListInfo, setOpen, deleteCard, deleteTask } = useContext(TaskContext)
 
    useEffect(() => {
        let savedTaskList = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskList){
            setTaskListInfo([...savedTaskList])
        }
    },[])
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={2}>
                        <Typography variant='h2' color='primary'>Task Lists</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant='contained' color='primary' className={classes.button} aria-label='open drawer' onClick={() => setOpen(true)}>
                            New List
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className={classes.container} spacing={5}>
                    {taskListInfo.length > 0 ? taskListInfo.map((item,index) => (
                            <TaskCard item={item} index={index} key={index} deleteCard={deleteCard} deleteTask={deleteTask}/>
                    )): (<Typography variant='body2' className={classes.message}>You don't have a task list yet. Let's create one!</Typography>)}
                </Grid>
                <NewTaskDrawer />
            </Paper>
        </>
    )
}

export default Tasks
