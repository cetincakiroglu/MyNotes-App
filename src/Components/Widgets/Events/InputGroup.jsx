import React, { useRef } from 'react'
import { Paper, TextField, IconButton, Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { v4 as uuidv4 } from 'uuid'

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

function InputGroup({ eventList, setEventList, openInputDrawer, setOpenInputDrawer }) {
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

    const eventName = useRef();
    const eventDate = useRef();
    const eventTime = useRef();
    const eventSummary = useRef();
    const eventLocation = useRef();

    function Event(obj){

        this.id = uuidv4();
        this.date = obj.date;
        this.time = obj.time;
        this.name = obj.name;
        this.summary = obj.summary;
        this.location = obj.location;
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; 

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = new Event({date: eventDate.current.value, time: eventTime.current.value, name: eventName.current.value, summary: eventSummary.current.value, location: eventLocation.current.value});
        let eventsArr = eventList;
        eventsArr.unshift(newEvent);
        setEventList([...eventsArr]);

        localStorage.setItem('Events', JSON.stringify(eventList))
    }

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
