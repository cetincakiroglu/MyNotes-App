import React, { useContext } from 'react'
import { TextField, IconButton,Button, Divider, Grid, List, ListItem, Typography } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'

//css to hide scrollbar
import './scrollbar.css'

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
        width:'100%'
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
        height:'12em',
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
        padding:'0em 1em'
    },
    button:{
        maxWidth:'16em',
        marginTop:'1em',
        display:'block'
    },
    buttonDisabled:{
        display:'none'
    },
    taskWrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    }
})

function InputGroup() {
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
    
    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                inputRef={title} 
                className={classes.title} 
                variant='outlined' 
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
                    <TextField inputRef={category} variant='standard' label='Add Category' id='standard-basic-1'/>
                    <IconButton onClick={addCategory} color='primary'>
                        <AddRoundedIcon />
                    </IconButton>
                </div>
            
                <Typography
                variant='body1' 
                className={classes.categories}>
                Categories:
                {categoryList.map((item,index) => (
                    `#${item}`
                ))}
                </Typography>
                <div >
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
        </>
    )
}

export default InputGroup
