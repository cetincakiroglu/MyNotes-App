import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid' 
import { db } from '../Auth/firebase'
import { AuthContext } from '../Context/AuthContext';

export const TaskContext = createContext();

export const TaskProvider = props => {
    const [taskListInfo, setTaskListInfo] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line
    const [dbLoading, setDbLoading] = useState(false)

    const title = useRef();
    const taskListItem = useRef();
    const category = useRef();
    const { currentUser } = useContext(AuthContext)
    // db ref
    const tasksRef = db.collection('Tasks');
    
    // get tasks collection from db
    function getTasks(){
        if(currentUser){
            setDbLoading(true);
            tasksRef.where('ownerID', '==', currentUser.uid).onSnapshot(querySnapshot => {
                const items = [];
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                });
                setDbLoading(false);
                setTaskListInfo(items);
            })
        }
    }

    const addTask = (e) => {
        if(e.keyCode === 13){
            e.stopPropagation();
            e.preventDefault();
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
    }
    // remove task inside input group
    const removeTask = (num) => {
        let taskArr = [...taskList];
        taskArr.splice(num,1);
        setTaskList([...taskArr]);
    }
    
    const addCategory = (e) => {
        // TODO: keyboard support makes onClick disabled, fix it.
        if( e.keyCode === 13 ) {
            console.log(e.currentTarget)
            e.preventDefault();
            e.stopPropagation();
            let categoryItem = category.current.value;
            categoryItem = categoryItem.replace(/\s+/g, '');
    
            let categoryArr = categoryList;
            categoryArr.unshift(categoryItem);
            setCategoryList([...categoryArr]);
            category.current.value='';
        }
    }

    // delete from db
    function deleteTaskList(taskList) {
        tasksRef.doc(taskList.id)
                .delete()
                .catch(err => console.log(err));
    }

    // delete single task & update db
    const deleteTask = (num, str, taskList) => {
        let newList = {...taskList}
        newList.tasklist.splice(num,1);
        tasksRef.doc(taskList.id)
                .update(newList)
                .catch(err => console.log(err));
    }

    // handle checkbox & update db
    const handleCheckbox = (e,num, taskList) => {
       let newList = {...taskList}
       newList.tasklist[num].status = e.target.checked;
       tasksRef.doc(taskList.id)
               .update(newList)
    }

    // add task list to db
    const handleSubmit = (e) => {
        e.preventDefault();
        const tags = [...categoryList];
        const tasks = [...taskList];
        //create new task list object
       const newTaskList = {
        id        : uuidv4(),
        ownerID   : currentUser ? currentUser.uid : 'unknown',
        ownerEmail: currentUser.email ? currentUser.email : 'unknown',
        date      : new Date().toDateString(),
        title     : title.current.value, 
        tasklist  : tasks,
        categories: tags 
        };

        // add to db
        tasksRef.doc(newTaskList.id)
                .set(newTaskList)
                .catch(err => console.log(err));

        // reset values
        setTaskList([]);
        setCategoryList([]);
        title.current.value = '';
    }
    
    const value={
        getTasks,
        deleteTaskList,
        taskListInfo,
        setTaskListInfo,
        taskList,
        setTaskList,
        categoryList,
        setCategoryList,
        addTask,
        deleteTask,
        removeTask,
        addCategory,
        handleSubmit,
        handleCheckbox,
        title,
        category,
        taskListItem,
        open,
        setOpen
    }

    //listen to db
    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    },[])

    return(
        <TaskContext.Provider value={value}>
            { props.children }
        </TaskContext.Provider>
    )
}