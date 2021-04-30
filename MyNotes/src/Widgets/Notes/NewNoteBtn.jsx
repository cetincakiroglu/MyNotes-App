import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddRoundedIcon from '@material-ui/icons/Add';

function NewNoteBtn() {
    const history = useHistory();
    return (
        <>
            <Tooltip title='New Note'>
                <IconButton onClick={() => history.push('/New')} color='primary'>
                    <AddRoundedIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default NewNoteBtn
