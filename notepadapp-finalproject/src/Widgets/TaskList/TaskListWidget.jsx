import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import InputGroup from './InputGroup'
import DisplayGroup from './DisplayGroup'

function TaskListWidget() {
    
    const { taskListInfo, setTaskListInfo } = useContext(TaskContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false)

    const useStyles = makeStyles({
        paper:{
            padding:'0em 15px',
            backgroundColor:'#161616',
            position:'relative',
            minHeight:'410px'
        },
        wrapper:{
            minHeight:'25em',
            margin:'0 1em'
        },
        title:{
            margin:'20px 0px'
        },
        button:{
            marginLeft:'10px'
        }
    })
    const classes = useStyles();
    
    useEffect(() => {
        let savedTaskList = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskList && savedTaskList !==[]){
            setTaskListInfo(savedTaskList);
        }
    },[])
    
    return (
        <>
           <Paper className={classes.paper} elevation={5}>
               <Grid container alignItems='center'>
                   <Grid item className={classes.title}>
                        <Typography variant='h3' color='primary'>Recent Tasks</Typography>
                   </Grid>
                   <Grid item className={classes.button}>
                        <Tooltip title='New Task List'>
                            <IconButton color='primary' onClick={() => setOpenInputDrawer(true)} >
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>  
                   </Grid>
               </Grid>
                <Grid container spacing={2}>
                        {taskListInfo.map((item,index) => (
                            <Grid item xs={3}>
                                <DisplayGroup item={item} index={index} key={index}/>
                            </Grid>
                            ))}
                    <InputGroup openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer}/>
                </Grid>
           </Paper>
        </>
    )
}

export default TaskListWidget
