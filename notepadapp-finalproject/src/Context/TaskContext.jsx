import React, { createContext, useState } from 'react'

export const TaskContext = createContext();

export const TaskProvider = props => {
    const [taskListInfo, setTaskListInfo] = useState([]);
    
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
        <TaskContext.Provider value={{taskListInfo:taskListInfo, setTaskListInfo: setTaskListInfo, handleCheckbox:handleCheckbox}}>
            { props.children }
        </TaskContext.Provider>
    )
}