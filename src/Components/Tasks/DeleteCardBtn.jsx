import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { makeStyles } from '@material-ui/core'

function DeleteCardBtn({ showBtn, deleteTaskList, item }) {
    const useStyles = makeStyles({
        deleteBtn:{
            display: showBtn ? 'block' : 'none',
        }
      })
      const classes = useStyles();
    return (
        <>
            <Tooltip title='Delete List'>
                <IconButton color='secondary' className={classes.deleteBtn} onClick={() => deleteTaskList(item)}>
                    <CloseRoundedIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}
export default DeleteCardBtn
