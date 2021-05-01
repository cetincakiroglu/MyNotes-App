import React, { useState } from 'react'
import { ListItem, Typography, Checkbox, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteBtn from './DeleteBtn'

const useStyles = makeStyles({
    listItem:{
        display:'flex',
        justifyContent:'space-between',
        padding:'0',
        margin:'0.5em 0',
        flexShrink:'0 !important'
    },
    list:{
        height:'80%',
    },
    iconContainer:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexShrink:'0',
        width:'48px',
        height:'48px'
    },
    taskBox:{
        display:'flex',
        alignItems:'center',
    },
    text:{
        '&:focus':{
            outline:'none'
        }
    }
})

function Task({ el, index, item, handleCheckbox, deleteTask }) {
    const [show, setShow] = useState(false);

    const classes = useStyles();
    return (
        <>
            <ListItem className={classes.listItem} key={index} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <div className={classes.taskBox}>
                    <Checkbox checked={el.status} value={el.status} color='primary' onChange={(e) => handleCheckbox(e,item,index)}/>
                    <Typography variant={el.status ? 'body1' : 'body2'} contentEditable='true' className={classes.text}>
                        {el.task}
                    </Typography>
                </div>
                <Tooltip title='Delete'>
                    <div className={classes.iconContainer}>
                        <DeleteBtn show={show} deleteTask={deleteTask} item={item} index={index}/>
                    </div>
                </Tooltip>
            </ListItem>
        </>
    )
}

export default Task
