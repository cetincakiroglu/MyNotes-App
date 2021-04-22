import React, { useContext, useRef, useState } from 'react'
import { TextField, IconButton,Button, Divider, Grid, List, ListItem, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'
import { v4 as uuidv4 } from 'uuid'

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
        overflowX:'hidden'
    },
    task:{
        display:'flex',
        alignItems:'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    categories:{
        overflow:'hidden',
        textOverflow:'ellipsis'
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
    const { taskListInfo, setTaskListInfo } = useContext(TaskContext);
    const [taskList, setTaskList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const title = useRef();
    const taskListItem = useRef();
    const category = useRef();

    function TaskList(obj){
        this.id = uuidv4();
        this.date = new Date().toDateString();
        this.title = obj.title;
        this.tasklist = obj.tasklist;
        this.categories = obj.categories;
    }

    const addTask = () => {
        const textInput = taskListItem.current.value;
        if(textInput && (textInput !== '' || textInput !== ' ')){
            const taskObj = {
                task: textInput,
                status: false
            };
      
            let arr = taskList;
            arr.unshift(taskObj);
            setTaskList([...arr]);
            console.log('TASKS',taskList)
            taskListItem.current.value='';
        } else{
            console.log('NO')
        }
    }

    const removeTask = (num) => {
        let taskArr = [...taskList];
        taskArr.splice(num,1);
        setTaskList(taskArr);
    }
    
    const addCategory = () => {
        let categoryItem = category.current.value;
        categoryItem = categoryItem.replace(/\s+/g, '');

        let categoryArr = categoryList;
        categoryArr.unshift(categoryItem);
        setCategoryList([...categoryArr]);
        // TODO: event listener ekle, space tuşuna basınca otomatik olarak kategorileri ayırsın.
        category.current.value='';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const tags = [...categoryList];
        const tasks = [...taskList];
        //create new task list object
        const newTaskList = new TaskList({title:title.current.value, categories:tags, tasklist:tasks})
        title.current.value = '';
        //update state & retrieved form input.
        let tasksArr = taskListInfo;
        tasksArr.unshift(newTaskList);
        setTaskListInfo([...tasksArr]);

        //save to local
        let savedTaskListInfo = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskListInfo && savedTaskListInfo !== []){
            localStorage.setItem('Task List', JSON.stringify([...taskListInfo, ...savedTaskListInfo]))
        }else {
            localStorage.setItem('Task List', JSON.stringify(taskListInfo))
        }
        setTaskList([]);
        setCategoryList([]);
    }

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
                        <AddIcon />
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
                        <AddIcon />
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
