import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { makeStyles } from '@material-ui/styles'

function DeleteBtn({ showBtn, deleteEvent, index, item }) {
    const useStyles = makeStyles({
        icon:{
            display: showBtn ? 'block' : 'none',
            width:'90%'
        }
    })
    const classes = useStyles();

    return (
        <>
            <Tooltip title='Remove Event'>
                <IconButton color='secondary' className={classes.icon} onClick={() => deleteEvent(item)}>
                    <DeleteOutline />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default DeleteBtn
