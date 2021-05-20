import React, { useState, useContext, useEffect } from 'react'
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './events.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventDrawer from '../Widgets/Events/EventDrawer'
import { EventContext } from '../Context/EventContext'
import { AuthContext } from './../Context/AuthContext'
import moment from 'moment'
import EventModal from './EventModal'

// MUI styles
const useStyles = makeStyles({
    paper:{
        width:'100%',
        borderRadius:'0',
        overflow:'hidden',
        height:'100vh',
    },
    container:{
        marginTop:'40px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        height:'85vh',
        padding:'30px',
    },
    sideBar:{
        maxHeight:'500px',
        padding:'20px',
        background:'#161616',
    },
    calendarPaper:{
        background:'#161616',
        padding:'20px'
    },
    message:{
        margin:'100px auto'
    },
    cardContainer:{
        maxHeight:'400px',
        marginTop:'30px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
    },
    cardPaper:{
        padding:'20px 10px',
        backgroundColor:'#242424'
    },
    button:{
        width:'100%',
        height:'100%',
    }
})

function Events() {
    const { gapi, eventList, setStartDate, setEndDate, eventsRef, getEvents } = useContext(EventContext)
    const { currentUser } = useContext(AuthContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [eventId, setEventId] = useState([]); // TODO: bad code, fix it.
    const classes = useStyles();
   
    // handle calendar select
    const handleDateSelect = (selectInfo) => {
        setOpenInputDrawer(true);
        setStartDate(selectInfo.start)
        setEndDate(selectInfo.end)
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect();
    }

    // event on-click handler
    const eventClick = (eventClickInfo) => {
        const id = eventClickInfo.event.id;
        let arr = eventId;
        // TODO: bad code, fix it.
        arr.unshift(id);
        setEventId([...arr]);
        setShowModal(true);
    }

    const closeModal = () => {
    setShowModal(false);
    };

    // update event by drag & drop
    const handleDrag = (info) => {
        const { start, title, id, end } = info.event
        // object to update Firestore
        const db_event = {
            id: id.split('_').splice(0,1).join(''),
            description:title,
            start: {
                dateTime: moment(start).format(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime:moment(end).format(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }
        }
        // object to update Google Calendar
        const event = gapi.client.calendar.events.get({'calendarId': 'primary', 'eventId': id})
        event.start = {
            'dateTime': moment(start).format(),
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        event.end = {
            'dateTime': moment(end).format(),
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
        gapi.client.load('calendar', 'v3', () => {
            const request = gapi.client.calendar.events.patch({
                'calendarId': 'primary',
                'eventId' : id,
                'resource': event
            })
            request.execute((res) => {
                if(res.error || res === false){
                    console.log('error', res.error)
                }else {
                    console.log('EVENT UPDATED');
                }
            })
        })

        // update Firestore
        eventsRef.doc(db_event.id)
        .update(db_event)
        .catch(err => console.error(err));
    }
    
    // get events from firestore
    const getEventsFromDB = (fetchInfo, callback) => {
        retrieveData(fetchInfo.start, fetchInfo.end, callback);
    }

    const retrieveData = async (from, to, callback) => {
        try{
            const filteredData = await eventsRef
            .where('creator.email', '==', currentUser.email)
            .orderBy('created')
            .get();
            callback(filteredData.docs.map(doc => {
                return(
                    {
                        start:doc.data().start.dateTime,
                        end: doc.data().end.dateTime,
                        title: doc.data().description,
                        id: doc.data().id,
                        allDay: false,
                    }
                )
            }))

        }catch(err){
            console.error('Failed to retrieve data. Error:', err)
        }
    }

    // calendar contents
    const eventContent = (eventInfo) => {
        return(
            <>
            <div className='calendar-event'>
                <b>{eventInfo.event.title}</b>
                <i>{eventInfo.timeText}m</i>
            </div>
            </>
        )
    }

    // All events sidebar
    const sideBar = (
        <Grid item xs={12} md={3}>
        <Paper className={classes.sideBar} elevation={5}>
            <Grid container direction='column' spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h4' color='primary' align='left'>Upcoming Events</Typography>
                </Grid>
                <Divider /> 
            </Grid>
            <Grid container spacing={3} className={classes.cardContainer}>
                {eventList.length > 0 ? eventList.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Paper elevation={5} className={classes.cardPaper}>
                            <Typography variant='body2'>{item.description}</Typography>
                            <Typography variant='body2'>{moment(item.start.dateTime).format('h:mm A, MMMM Do')}</Typography>
                        </Paper>
                    </Grid>
                )) : (<Typography variant='body1' className={classes.message}>You have 0 upcoming events.</Typography>)}
            </Grid>
        </Paper>
    </Grid>
    )
    
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    },[])
    return (
        <Paper className={classes.paper}>
            <Grid container style={{padding:'30px'}}>
                <Grid item xs={6} md={2}>
                    <Typography variant='h2' color='primary'>Events</Typography>
                </Grid>
                <Grid item xs={6} md={1}>
                    <Button color='primary' variant='contained' className={classes.button} onClick={() => setOpenInputDrawer(true)}>
                        New Event
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.container} justify='space-between' spacing={5}>
               {sideBar}
                <Grid item xs={12} md={8}>
                    <Paper className={classes.calendarPaper} elevation={5}>
                        <FullCalendar 
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                headerToolbar={{
                                    left:'prev next today',
                                    center:'title',
                                    right:'dayGridMonth timeGridDay'
                                }}
                                initialView='dayGridMonth'
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={true}
                                events={getEventsFromDB}
                                select={handleDateSelect}
                                eventContent={eventContent}
                                eventClick={eventClick}
                                eventDrop={handleDrag}
                                // eventReceive={handleDrag}
                                eventOverlap={false}
                                dayMaxEventRows={3}
                                handleWindowResize={true}
                                contentHeight='auto'
                                // TODO: add day popover
                            />
            <EventModal closeModal={closeModal} showModal={showModal} eventId={eventId} eventList={eventList}/>
                    </Paper>
                </Grid>
            </Grid>
            <EventDrawer setOpenInputDrawer={setOpenInputDrawer} openInputDrawer={openInputDrawer}/>
        </Paper>
    )
}

export default Events
