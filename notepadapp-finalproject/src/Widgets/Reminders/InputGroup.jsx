import React, { useRef } from 'react'
import { Paper, TextField, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles({
    paper:{
        backgroundColor:'#3a3a3a'
    },
    inputItem:{
        marginBottom:'0.5em',
    },
    form:{
        display:'flex',
    },
    icon:{
        width:'56px',
        height:'56px',
        margin:'auto'
    }
})

function InputGroup({ eventList, setEventList }) {
    const classes = useStyles();

    const eventName = useRef();
    const eventDate = useRef();
    const eventTime = useRef();
    const eventSummary = useRef();
    const eventLocation = useRef();

    function Event(obj){

        this.id = uuidv4();
        this.date = obj.date;
        this.time = obj.time;
        this.eventName = obj.name;
        this.eventSummary = obj.summary;
        this.eventLocation = obj.location;

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
        <form onSubmit={handleSubmit} className={classes.form}>
            <div>
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
            />
            <TextField
                className={classes.inputItem} 
                id='time'
                aria-label='Select Time'
                type='time'
                inputRef={eventTime}
                required
            />
            </div>
            <Tooltip title='Create Event'>
                <IconButton className={classes.icon} color='primary' variant='outlined' type='submit'>
                    <AddRoundedIcon />
                </IconButton>
            </Tooltip>
        </form>
        </>
    )
}

export default InputGroup
