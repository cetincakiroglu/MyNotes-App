import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddRoundedIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    button:{
        height:'325px',
        maxWidth:'150px',
        marginTop:'67px',
        // TODO: FIX THIS MARGIN IS NOT WORKING PROPERLY
    },
    icon:{
       transform: 'scale(1.5)'
    }
})
function NewNoteBtn() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <>
            <Button className={classes.button} variant='contained' color='primary' onClick={() => history.push('/New')}>
                <Grid item>
                    <Typography variant='h6'>New Note</Typography>
                    <AddRoundedIcon className={classes.icon}/>
                </Grid>
            </Button>
        </>
    )
}

export default NewNoteBtn
