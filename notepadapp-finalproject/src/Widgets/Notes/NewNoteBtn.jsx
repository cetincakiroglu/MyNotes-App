import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddRoundedIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
   
})

function NewNoteBtn() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <>
            <IconButton onClick={() => history.push('/New')} color='primary' className={classes.button}>
                <AddRoundedIcon />
            </IconButton>
        </>
    )
}

export default NewNoteBtn
