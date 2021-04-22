import React,{ useContext, useEffect } from 'react'
import { TaskContext } from './../Context/TaskContext';
import { Grid, Paper, Typography, Divider, Card, CardContent, Checkbox, IconButton, Tooltip, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
    card:{
        height:'20em'
    },
    header:{
        padding:'1em',
        display:'flex',
        flexDirection:'column'
    },
    date:{
        alignSelf:'flex-end'
    },
    listItem:{
        display:'flex',
        justifyContent:'space-between',
        padding:'0',
        margin:'0'
    },
    list:{
        height:'80%',
    }
})
function TaskCard({ item, index }) {
    const { handleCheckbox, taskListInfo, setTaskListInfo } = useContext(TaskContext);
    const classes = useStyles();

    const deleteTask = (num, str, arr) => {
        let taskList = [...taskListInfo]
        // console.log(taskList);
        taskList = taskList.filter(item => item.id === str ? item.tasklist.slice(num,1) : item )
        console.log(taskList)
    }
    return (
        <>
        <Grid item xs={12} md={3}>
            <Paper elevation={5}>
                <Card  className={classes.card}>
                    <div className={classes.header}>
                        <Typography variant='caption' className={classes.date}>{item.date}</Typography>
                        <Typography variant='h4' >{item.title ? item.title : 'Untitled'}</Typography>
                    </div>
                    <Divider />
                    <CardContent>
                        <List>
                            {item.tasklist.map((el,index) => (
                            <ListItem className={classes.listItem} key={index}>
                                <div style={{display: 'flex', alignItems:'center'}}>
                                    <Checkbox checked={el.status} value={el.status} color='primary' onChange={(e) => handleCheckbox(e,item,index)}/>
                                    <Typography variant='body2'>
                                        {el.task}
                                    </Typography>
                                </div>
                                <IconButton color='secondary' onClick={() =>deleteTask(index, item.id, item)}>
                                    <DeleteOutline />
                                </IconButton>
                            </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
        </>
    )
}

export default TaskCard
