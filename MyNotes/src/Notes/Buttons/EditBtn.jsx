import React,{ useContext } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { makeStyles } from '@material-ui/styles'
import { NoteContext } from './../../Context/NoteContext';

function EditBtn({ showBtn, item, index }) {
    const { editNote } = useContext(NoteContext)
    const useStyles = makeStyles({
        editBtn:{
            display: showBtn ? 'block' : 'none',
        }
    })
    const classes = useStyles();
    return (
        <>
            <Tooltip title='Edit'>
                <IconButton className={classes.editBtn} color='primary' onClick={() => editNote(item)}>
                    <EditRoundedIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default EditBtn
