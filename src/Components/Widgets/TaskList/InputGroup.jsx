import React, { useContext } from 'react'
import { Paper, TextField, IconButton, Button, Divider, Grid, List, ListItem, Typography, Tooltip} from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import './drawer.css'

const useStyles = makeStyles({
    taskInput:{
        display:'flex',
        justifyContent:'space-between',
        margin:'1em auto'
    },
    form:{
        maxWidth:'16em',
        padding:'1em 0',
        height:'100%'
    },
    title:{
        width:'',
        marginTop:'1em',
    },
    divider:{
        maxWidth:'16em'
    },
    listItem:{
        display:'flex',
        justifyContent:'space-between',
        maxWidth:'17em',
    },
    taskList:{
        minHeight:'5em',
        maxHeight:'12em',
        overflowY:'scroll',
        overflowX:'hidden',
        scrollbarWidth:'none'
    },
    task:{
        display:'flex',
        alignItems:'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    categories:{
        overflow:'hidden',
        textOverflow:'ellipsis',
        padding:'0em 1em',
        alignSelf:'flex-start !important',
    },
    button:{
        maxWidth:'10em',
        margin:'1em auto 0 auto',
        display:'block'
    },
    buttonDisabled:{
        display:'none'
    },
    taskWrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    closeIcon:{
        position:'absolute',
        top:-10,
        left:-10,
        '&:hover':{
            backgroundColor:'transparent !important'
        }
    }
})

function InputGroup({openInputDrawer, setOpenInputDrawer}) {
    const classes = useStyles();
    const {  
        taskList, 
        categoryList, 
        addTask, 
        removeTask,
        addCategory,  
        title, 
        category, 
        taskListItem,
        handleSubmit 
    } = useContext(TaskContext);
    const drawerStyles = makeStyles({
        paper:{
            width:openInputDrawer ? '300px' : 0,
            display: openInputDrawer ? 'block' : 'none',
            position: openInputDrawer ? 'absolute' : 'relative',
            right:1,
            top:1,
            zIndex:100,
            animation:openInputDrawer ? 'openTaskList .1s' : 'none',
            padding:'0 1em',
            height:'100%',
            
        }
    })
    const drawer = drawerStyles();
    return (
        <>
            <Paper className={drawer.paper} elevation={5}>
                <Tooltip title='Close'>
                    <IconButton color='secondary' className={classes.closeIcon}>
                        <CloseRoundedIcon onClick={() => setOpenInputDrawer(false)}/>
                    </IconButton>
                </Tooltip>
                <form  onSubmit={handleSubmit}>
                    <TextField
                    inputRef={title} 
                    className={classes.title} 
                   
                    id='outlined-basic' 
                    label='Title'/>
                    <div className={classes.taskInput}>
                        <TextField inputRef={taskListItem} 
                        variant='standard' 
                        label='Add Task' 
                        id='standard-basic' 
                        />
                        <IconButton color='primary' onClick={addTask}>
                            <AddRoundedIcon />
                        </IconButton>
                    </div>
                <Divider className={classes.divider} />
                    <Grid item className={classes.taskWrapper}>
                        <List className={classes.taskList}>
                        {taskList.map((item,index) => (
                            <ListItem  className={classes.listItem} key={index}>
                                <div className={classes.task}>
                                    <Typography variant='body2'>
                                    {item.task}
                                    </Typography>
                                </div>
                                    <IconButton color='secondary' onClick={() => removeTask(index)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                            </ListItem>
                        ))} 
                        </List>
                        <div className={classes.taskInput}>
                            <TextField inputRef={category} className={taskListItem} variant='standard' label='Add Category' id='standard-basic-1'/>
                            <IconButton onClick={addCategory} color='primary'>
                                <AddRoundedIcon />
                            </IconButton>
                        </div>
                        <div>    
                            <Typography
                                variant='body1' 
                                className={classes.categories}>
                                Categories:
                                {categoryList.map((item,index) => (
                                    `#${item}`
                                    ))}
                            </Typography>
                            <Button 
                                className={taskList[0] ? classes.button : classes.buttonDisabled}
                                variant='contained' 
                                color='primary' 
                                type='submit' 
                                fullWidth>
                                Save
                            </Button>
                        </div>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default InputGroup
