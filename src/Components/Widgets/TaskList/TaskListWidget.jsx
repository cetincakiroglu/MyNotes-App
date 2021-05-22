import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Paper, Typography, IconButton, Tooltip, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import { AuthContext } from './../../Context/AuthContext'
import TaskCard from './TaskCard'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import { widgetStyles } from './styles'

function TaskListWidget() {
    const { width } = useWindowDimensions();
    const { taskListInfo, setTaskListInfo, setOpen, allLists, tasksRef } = useContext(TaskContext);
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    const [select, setSelect] = useState('recent')

    // MUI styling, fold
    const classes = widgetStyles();
    const responsiveStyles = makeStyles({
        paper:{
            padding:'0 15px',
            backgroundColor:'#161616',
            position:'relative',
            minHeight: width > 500 ? '450px' : '520px',
        },
        taskListContainer:{
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none',
            maxHeight: width > 500 ? '450px' : '520px',
        },
    })
    const responsive = responsiveStyles();


    // category filter
    // TODO: same approach used 4 times. DRY violation. Refactor with class.
    const arr = [];
    allLists.map(list =>list.categories.map(category => !(arr.includes(category)) ? arr.push(category) : category));
    const filterLists = (e) => {
        const param = e.target.value;
        if(currentUser) {
            if(param !== 'recent'){
                tasksRef.where('ownerID', '==', currentUser.uid)
                .where('categories', 'array-contains', param)
                .onSnapshot(querySnapshot => {
                    const items = [];
                    querySnapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setTaskListInfo(items);
                    setSelect(param);
                })
            } else if(param === 'recent') {
                tasksRef.where('ownerID', '==', currentUser.uid)
                .orderBy('created')
                .onSnapshot(querySnapshot => {
                    const items = [];
                    querySnapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setTaskListInfo(items);
                    setSelect(param);
                })
            }
        }
    }
    // select group
    const categoryButtons = (
         <FormControl component="fieldset" className={classes.radioGroup}>
            <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} value={select} onChange={filterLists}>
                {arr.splice(0,7).map((category, index) => (
                    <FormControlLabel key={index} value={category} control={<Radio color='primary' />} label={`#${category}`}/>
                    ))}
                    <FormControlLabel value='recent' control={<Radio color='primary' />} label='Recent'/>
            </RadioGroup>
        </FormControl>
    )

    return (
        <>
           <Paper className={responsive.paper} elevation={5}>
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
                   <Grid item xs={8} alignSelf='end' className={classes.categories}>
                    {categoryButtons}
                   </Grid>
                   <Grid item xs={1}>
                        <Button color='primary' onClick={() => history.push('/Tasks')} className={classes.categories}>See All</Button>
                   </Grid>
               </Grid>
                <Grid container spacing={3} className={responsive.taskListContainer}>
                    {taskListInfo.length > 0 ? taskListInfo.map((item,index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <TaskCard item={item} index={index} key={index}/>
                        </Grid>
                        )): <Typography variant='body1' className={classes.subtitle}>Create a task list.</Typography>}
                </Grid>
           </Paper>
        </>
    )
}

export default TaskListWidget
