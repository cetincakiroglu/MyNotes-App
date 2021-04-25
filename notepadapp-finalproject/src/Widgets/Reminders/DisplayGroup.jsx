import React from 'react'
import { Card, Typography, Divider, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    icon:{
       transform:'scale(0.5)',
    },
    iconContainer:{
        margin:'auto',
        width:'32px',
        height:'32px'
    },
    card:{
        
        padding:'0.5em',
        display:'flex',
        justifyContent:'space-between',
        margin:'0 auto'
    },
})
function DisplayGroup({ item,index }) {

    const classes = useStyles();
    return (
        <>
            <Card className={classes.card}>
                <div>
                    <Typography variant='body2'>{item.date}</Typography>
                    <Typography variant='body2'>{item.time}</Typography>
                </div>
                <div>
                    <Typography variant='h4'>{item.eventName}</Typography>
                    <Typography variant='body1'>{item.eventSummary}</Typography>
                    <Typography variant='body1'>{item.eventLocation}</Typography>
                </div>
                <div>
                    <Tooltip title='Add to Google Calendar'>
                        <IconButton >
                            <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" className={classes.icon} alt='google logo'/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Card>
        </>
    )
}

export default DisplayGroup
