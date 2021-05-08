import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import InputGroup from './InputGroup'
import DisplayGroup from './DisplayGroup'
import useWindowDimensions from '../../Hooks/useWindowDimensions'

function TaskListWidget() {
    const {width} = useWindowDimensions();
    const { taskListInfo } = useContext(TaskContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false)

    const useStyles = makeStyles({
        paper:{
            padding:'0 15px',
            backgroundColor:'#161616',
            position:'relative',
            minHeight: width > 500 ? '450px' : '520px',
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
        },
        taskListContainer:{
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none',
            maxHeight: width > 500 ? '450px' : '520px',
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
                            <IconButton color='primary' onClick={() => setOpenInputDrawer(true)} >
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>  
                   </Grid>
               </Grid>
                <Grid container spacing={3} className={classes.taskListContainer}>
                        {taskListInfo !== [] || taskListInfo !== undefined ? taskListInfo.map((item,index) => (
                            <Grid item xs={12} md={3}>
                                <DisplayGroup item={item} index={index} key={index}/>
                            </Grid>
                            
                            )): <Typography variant='body1'>It seems you don't have any task list yet. Let's create one!</Typography>}
                    <InputGroup openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer}/>
                </Grid>
           </Paper>
        </>
    )
}

export default TaskListWidget
