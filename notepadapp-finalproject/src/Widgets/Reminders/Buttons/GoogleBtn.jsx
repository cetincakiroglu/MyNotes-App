import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


function GoogleBtn({ showBtn, syncGoogle, item, index }) {
    const useStyles = makeStyles({
        icon:{
            transform:'scale(0.5)',
            display: showBtn ? 'block' : 'none'
        }
    })
    const classes = useStyles();

    return (
        <>
             <Tooltip title='Add to Google Calendar'>
                <IconButton onClick={() => syncGoogle(item)}>
                    <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" className={classes.icon} alt='google logo'/>
                </IconButton>
            </Tooltip>
        </>
    )
}

export default GoogleBtn
