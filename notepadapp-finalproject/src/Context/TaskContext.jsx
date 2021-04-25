import React, { createContext, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid' 

export const TaskContext = createContext();

export const TaskProvider = props => {
    const [taskListInfo, setTaskListInfo] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false);

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
        setTaskList([...taskArr]);
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

    const deleteCard = (num) => {
        let arr = taskListInfo;
        arr.splice(num,1);
        setTaskListInfo([...arr]);
        localStorage.setItem('Task List', JSON.stringify(taskListInfo))
    }

    const deleteTask = (num, str, obj) => {
        let taskListArr = taskListInfo;
        obj.tasklist.splice(num,1);
        console.log(obj);
        taskListArr.map(item => item.id === str ? item.tasklist = obj.tasklist : item)
        setTaskListInfo([...taskListArr]);
        localStorage.setItem('Task List', JSON.stringify(taskListInfo))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const tags = [...categoryList];
        const tasks = [...taskList];
        //create new task list object
        const newTaskList = new TaskList({title:title.current.value, categories:tags, tasklist:tasks})
        title.current.value = '';
        //update state & retrieve form input.
        let tasksArr = taskListInfo;
        tasksArr.unshift(newTaskList);
        setTaskListInfo([...tasksArr]);

        //save to local
        localStorage.setItem('Task List', JSON.stringify(taskListInfo))

        setTaskList([]);
        setCategoryList([]);
    }

    const handleCheckbox = (e,item,num) => {
        let arr = taskListInfo;
        //loop the array, find the matching id & update the status. 
        arr.map(el => el.id === item.id ? item.tasklist[num].status = e.target.checked : item);
        setTaskListInfo([...arr]);

        //update local storage
        let savedTaskList = JSON.parse(localStorage.getItem('Task List'));
        if(savedTaskList && savedTaskList !== []){
            localStorage.setItem('Task List', JSON.stringify(taskListInfo))
        }
    }

    return(
        <TaskContext.Provider value={{
            taskListInfo:taskListInfo, 
            setTaskListInfo: setTaskListInfo,
            taskList: taskList,
            setTaskList: setTaskList,
            TaskList: TaskList,
            categoryList: categoryList,
            setCategoryList: setCategoryList,
            addTask: addTask,
            deleteTask: deleteTask,
            deleteCard: deleteCard,
            removeTask: removeTask,
            addCategory: addCategory,
            handleSubmit: handleSubmit,
            handleCheckbox:handleCheckbox,
            title:title,
            category:category,
            taskListItem: taskListItem,
            open:open,
            setOpen: setOpen
            }}>
            { props.children }
        </TaskContext.Provider>
    )
}