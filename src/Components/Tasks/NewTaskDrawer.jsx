import React,{ useContext } from 'react'
import { Drawer, Grid, Paper, Typography, IconButton, List, ListItem, Divider, Button, TextField, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { TaskContext } from '../Context/TaskContext';
import useWindowDimensions from './../Hooks/useWindowDimensions';

const useStyles = makeStyles({
    inputField:{
        width:'100%',
        margin:'1em 0'
    },
    paper:{
        height:'100vh',
        backgroundColor:'#161616',
        margin:'auto',
    },
    inputContainer:{
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
    },
    icon:{
        flexShrink:'0',
    },
    listItem:{
        display:'flex',
        justifyContent:'space-between',
        padding:'0',
        margin:'0'
    },
    categories:{
        margin:'1em 0',
        overflow:'hidden',
        textOverflow:'ellipsis'
    },
    button:{
        width:'100px',
        margin:'15px auto 0 auto',
        display:'block'
    },
    buttonDisabled:{
        display:'none'
    },
})

function NewTaskDrawer() {
    const { 
        taskList, 
        categoryList, 
        addTask, 
        removeTask,
        addCategory, 
        handleSubmit, 
        title, 
        category, 
        taskListItem,
        open,
        setOpen 
    } = useContext(TaskContext);
    const { width } = useWindowDimensions();

    // conditional styling
    const listStyles = makeStyles({
        taskList:{
            height:width > 500 ? '400px' : '300px',
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none',
        }
    })
    const formStyles = makeStyles({
        form:{
            padding:'0em 2em',
            width: width > 600 ? '30vw' : '80vw',
            minHeight:'500px',
        },
    })

    const formClasses = formStyles();
    const listClasses = listStyles();
    const classes = useStyles();

    // focus next input on enter
    const handleEnter = (e) => {
        if(e.keyCode === 13) {
            e.stopPropagation();
            e.preventDefault();
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index+1].focus();
        }
    }
    return (
        <>
        <div>
        <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
            <Paper elevation={5} className={classes.paper} >
                <Tooltip title='Close'>
                    <IconButton color='secondary' onClick={() => setOpen(false)}>
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </Tooltip>
                <form className={formClasses.form} onSubmit={handleSubmit}>
                    <TextField
                    onKeyDown={handleEnter}
                    className={classes.inputField} 
                    inputRef={title}
                    variant='outlined'
                    id='task-title'
                    label='Title'
                    />
                    <div className={classes.inputContainer}>
                        <TextField
                        onKeyDown={addTask}
                        className={classes.inputField}
                        inputRef={taskListItem}
                        variant='standard'
                        label='Add Task'
                        id='task-add'
                        />
                        {/* TODO: Temporary disabled. */}
                        {/* <div className={classes.icon}>
                            <Tooltip title='Add Task'>
                                <IconButton color='primary' onClick={addTask}>
                                    <AddRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </div> */}
                    </div>
                    <Divider />
                    <Grid item>
                        <List className={listClasses.taskList}>
                        {taskList.map((item,index) => (
                            <ListItem  className={classes.listItem} key={index}>
                                <div className={classes.task}>
                                    <Typography variant='body2'>
                                    {item.task}
                                    </Typography>
                                </div>
                                <Tooltip title='Remove Task'>
                                    <IconButton color='secondary' onClick={() => removeTask(index)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))} 
                        </List>
                        <div className={classes.inputContainer}>
                            <TextField
                                onKeyDown={addCategory}
                                className={classes.inputField} 
                                inputRef={category} 
                                variant='standard' 
                                label='Add Category' 
                                id='task-category'
                            />
                             {/* TODO: Temporary disabled. */}
                            {/* <div className={classes.icon}>
                                <Tooltip title='Add Category'>
                                    <IconButton onClick={addCategory} color='primary'>
                                        <AddRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                        </div>   
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
                        onClick={() => setOpen(false)}
                        >
                        Save
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Drawer>
        </div>
        </>
    )
}

export default NewTaskDrawer