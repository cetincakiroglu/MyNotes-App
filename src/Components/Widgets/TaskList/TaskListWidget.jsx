import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, Typography, IconButton, Tooltip, Button } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import TaskCard from './TaskCard'
import useWindowDimensions from '../../Hooks/useWindowDimensions'

function TaskListWidget() {
    const { width } = useWindowDimensions();
    const { taskListInfo, setOpen } = useContext(TaskContext);
    const history = useHistory();

    const useStyles = makeStyles({
        paper:{
            padding:'0 15px',
            backgroundColor:'#161616',
            position:'relative',
            minHeight: width > 500 ? '450px' : '520px',
        },
        wrapper:{
            minHeight:'25em',
        },
        title:{
            margin:'20px 0px'
        },
        button:{
            marginLeft:'10px'
        },
        taskListContainer:{
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none',
            maxHeight: width > 500 ? '450px' : '520px',
        },
        subtitle:{
            height:'325px',
            margin:'0 20%'
        },
        linkButton:{
            position:'absolute',
            left:'93.5%',
        }
    })
    const classes = useStyles();
    
    return (
        <>
           <Paper className={classes.paper} elevation={5}>
               <Grid container alignItems='center'>
                   <Grid item className={classes.title}>
                        <Typography variant='h3' color='primary'>Recent Tasks</Typography>
                   </Grid>
                   <Grid item className={classes.button}>
                        <Tooltip title='New Task List'>
                            <IconButton color='primary' onClick={() => setOpen(true)} >
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>  
                   </Grid>
               </Grid>
                <Grid container spacing={3} className={classes.taskListContainer}>
                    {taskListInfo.length > 0 ? taskListInfo.map((item,index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <TaskCard item={item} index={index} key={index}/>
                        </Grid>
                        )): <Typography variant='body1' className={classes.subtitle}>Create a task list.</Typography>}
                </Grid>
                <Button color='primary' onClick={() => history.push('/Tasks')} className={classes.linkButton}>See All</Button>
           </Paper>
        </>
    )
}

export default TaskListWidget
