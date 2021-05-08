import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { makeStyles } from '@material-ui/styles'
import useWindowDimensions from './../../../Hooks/useWindowDimensions';

function DeleteBtn({ showBtn, deleteEvent, index, item }) {
    const { width } = useWindowDimensions();
    const useStyles = makeStyles({
        icon:{
            display: showBtn ? 'block' : 'none',
        },
        iconMobile: {
            display: 'block',
        }
    })
    const classes = useStyles();

    return (
        <>
            <Tooltip title='Remove Event'>
                <IconButton color='secondary' className={width < 500 ? classes.iconMobile : classes.icon} onClick={() => deleteEvent(item)}>
                    <DeleteOutline />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default DeleteBtn
