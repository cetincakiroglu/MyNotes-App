import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutline from '@material-ui/icons/DeleteOutline'; 

function DeleteBtn({ show, deleteTask, item, index }) {
    const useStyles = makeStyles({
        deleteBtn:{
            display: show ? 'block' : 'none',
            margin:'0 auto',
        }
    })

    const classes = useStyles();
    return (
        <>
            <IconButton color='secondary' className={classes.deleteBtn} onClick={() => deleteTask(index, item.id, item)}>
                <DeleteOutline />
            </IconButton>  
        </>
    )
}

export default DeleteBtn
