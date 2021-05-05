import React,{ useContext } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { makeStyles } from '@material-ui/core'
import { NoteContext } from './../../Context/NoteContext';

function DeleteBtn({ item, showBtn, index }) {
    const useStyles = makeStyles({
      deleteBtn:{
          display: showBtn ? 'block' : 'none',
      }
    })
    const classes = useStyles();
    const { deleteNote } = useContext(NoteContext)
    return (
        <>
        <Tooltip title='Delete Note'>
            <IconButton color='secondary' className={classes.deleteBtn} onClick={() => deleteNote(item)}>
                <CloseRoundedIcon />
            </IconButton>
        </Tooltip>
        </>
    )
}

export default DeleteBtn
