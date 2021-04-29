import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { makeStyles } from '@material-ui/styles'

function DeleteBtn({ showBtn, deleteEvent, index }) {
    const useStyles = makeStyles({
        icon:{
            display: showBtn ? 'block' : 'none',
            flexShrink:'0',
        }
    })
    const classes = useStyles();

    return (
        <>
            <Tooltip title='Remove Event'>
                <IconButton color='secondary' className={classes.icon} onClick={() => deleteEvent(index)}>
                    <DeleteOutline />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default DeleteBtn
