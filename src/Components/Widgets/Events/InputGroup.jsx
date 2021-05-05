import React, { useContext } from 'react'
import { Paper, TextField, IconButton, Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { EventContext } from './../../Context/EventContext'

const useStyles = makeStyles({
    paper:{
        backgroundColor:'#3a3a3a'
    },
    inputItem:{
        marginBottom:'30px',
    },
    form:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column',
        height:'100%'
    },
    button:{
        maxWidth:'10em',
        margin:'1em auto 0 auto',
        display:'block'
    },
    buttonDisabled:{
        display:'none'
    },
    icon:{
        width:'56px',
        height:'56px',
        margin:'auto'
    },
    closeIcon:{
        position:'absolute',
        top:-10,
        left:-10,
        '&:hover':{
            backgroundColor:'transparent !important'
        }

    },
    inputWrapper:{
        marginTop:'30px',
        padding:'0 15px'
    }
})

function InputGroup (props) {
    const { openInputDrawer, setOpenInputDrawer } = props;
    const {eventName, eventDate, eventTime, eventSummary, eventLocation, handleSubmit, dbLoading } = useContext(EventContext);
    const classes = useStyles();
    const drawerStyles = makeStyles({
        paper:{
            width:openInputDrawer ? '300px' : 0,
            display: openInputDrawer ? 'block' : 'none',
            position: openInputDrawer ? 'absolute' : 'relative',
            right:1,
            top:1,
            zIndex:100,
            animation:openInputDrawer ? 'openTaskList .1s' : 'none',
            padding:'0 15px',
            height:'100%',
        }
    })
    const drawer = drawerStyles();

    return (
        <>
        <Paper className={drawer.paper} elevation={5}>
            <Tooltip title='Close'>
                <IconButton color='secondary' className={classes.closeIcon} onClick={() => setOpenInputDrawer(false)} >
                    <CloseRoundedIcon />
                </IconButton>
            </Tooltip>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.inputWrapper}>
                    <TextField
                        className={classes.inputItem}
                        id='event-name'
                        label='Event Name'
                        type='text'
                        inputRef={eventName}
                        required
                    />
                    <TextField
                        className={classes.inputItem} 
                        id='event-summary'
                        type='text'
                        label='Event Summary'
                        inputRef={eventSummary}
                    />
                    <TextField
                        className={classes.inputItem} 
                        id='event-location'
                        type='text'
                        label='Event Location'
                        inputRef={eventLocation}
                    />
                    <TextField
                        className={classes.inputItem} 
                        id='date'
                        aria-label='Select Date'
                        type='date'
                        inputRef={eventDate}
                        required
                        color='primary'
                    />
                    <br/>
                    <TextField
                        className={classes.inputItem} 
                        id='time'
                        aria-label='Select Time'
                        type='time'
                        inputRef={eventTime}
                        required
                        color='primary'
                    />
                </div>
                <Button color='primary' type='submit' variant='contained' className={classes.button}>Save</Button>
            </form>
        </Paper>
        </>
    )
}

export default InputGroup
