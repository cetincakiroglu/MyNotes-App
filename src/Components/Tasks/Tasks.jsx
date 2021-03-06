import React,{ useContext } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from '../Context/TaskContext'
import TaskCard from './TaskCard'
import NewTaskDrawer from './NewTaskDrawer'


const useStyles = makeStyles({
    paper:{
        width:'100%',
        borderRadius:'0',
        overflow:'hidden',
        minHeight:'100vh',
        scrollbarWidth:'none',
    },
    container:{
        marginTop:'40px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        maxHeight:'80vh',
        padding:'30px',
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
    const { taskListInfo, setOpen, deleteTaskList, deleteTask } = useContext(TaskContext)
 
   
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container  style={{padding:'30px'}}>
                    <Grid item xs={6} md={2}>
                        <Typography variant='h2' color='primary'>Task Lists</Typography>
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <Button variant='contained' color='primary' className={classes.button} aria-label='open drawer' onClick={() => setOpen(true)}>
                            New List
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className={classes.container} spacing={5}>
                    {taskListInfo.length > 0 ? taskListInfo.map((item,index) => (
                            <TaskCard item={item} index={index} key={index} deleteTaskList={deleteTaskList} deleteTask={deleteTask}/>
                    )): (<Typography variant='body2' className={classes.message}>You don't have a task list yet. Let's create one!</Typography>)}
                </Grid>
                <NewTaskDrawer />
            </Paper>
        </>
    )
}

export default Tasks
