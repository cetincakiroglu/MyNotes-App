import React,{ useState, useContext, useEffect } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles'
import EventCard from './EventCard'
import EventDrawer from './EventDrawer'
import {EventContext} from '../../Context/EventContext'
import { AuthContext } from './../../Context/AuthContext';

const useStyles = makeStyles({
    paper:{
        padding:'0 15px',
        backgroundColor:'#161616',
        position:'relative',
        minHeight:'500px'
    },
    title:{
        margin:'20px 0px'
    },
    button:{
        marginLeft:'10px',
    },
    container:{
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        maxHeight:'450px',
    },
    subtitle:{
        height:'325px',
        margin:'auto'
    }
})

function RemindersWidget() {
    const classes = useStyles();
    const { eventList, setEventList, deleteEvent } = useContext(EventContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);
    const { currentUser } = useContext(AuthContext)

    const gapi = window.gapi;
    const syncGoogle = (obj) => {
       
        gapi.load('client:auth2', () => {
            console.log('loaded client');
            gapi.client.init({
                apiKey:process.env.REACT_APP_GOOGLE_API_KEY,
                clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar.events",
            });

            gapi.client.load('calendar', 'v3', () => console.log('Calendar loaded!'));
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                var event = {
                    'summary': obj.name,
                    'location': obj.location,
                    'description': obj.summary,
                    'start': {
                      'dateTime': new Date(obj.date).toISOString(),
                      'timeZone': obj.timeZone
                    },
                    'end': {
                      'dateTime': new Date(obj.date).toISOString(),
                      'timeZone': obj.timeZone 
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=1'
                    ],
                    'attendees': false,
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  };

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource' : event
                })

                request.execute(event => {
                    window.open(event.htmlLink)
                })
                
            }).catch(err => console.log(err)) // TODO: Handle error properly.
        })
    }

    const getEventsFromGoogle = () => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey:process.env.REACT_APP_GOOGLE_API_KEY,
                clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar.events",
            })
            gapi.client.load('calendar', 'v3', () => console.log('Calendar loaded!'));
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                gapi.client.calendar.events.list({
                    calendarId:'primary',
                    timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: 'startTime'
                })
                .then(res => console.log('EVENTS', res.body));
                // TODO: Display all events
            })
        })

    }

    return (
        <>
            <Paper className={classes.paper} elevation={5}>
                {/* <button onClick={getEventsFromGoogle}>hey</button> */}
                <Grid container alignItems='center'>
                    <Grid item className={classes.title}>
                        <Typography variant='h3' color='primary'>Events</Typography>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Tooltip title='New Event'>
                            <IconButton color='primary' onClick={() => setOpenInputDrawer(true)} >
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>  
                   </Grid>
                </Grid>
                    <Grid container spacing={3} justify='center' className={classes.container}>
                        {eventList.length > 0 ? eventList.map((item,index) => (
                            <Grid item xs={12} key={item.id}>
                                <EventCard item={item} index={index} key={item.id} eventList={eventList} setEventList={setEventList} deleteEvent={deleteEvent} syncGoogle={syncGoogle}/>
                            </Grid>
                        )): (<Typography variant='body1' className={classes.subtitle}>You have 0 upcoming events.</Typography>)}
                    </Grid>
                        <EventDrawer openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer} eventList={eventList} setEventList={setEventList} />
            </Paper>
        </>
    )
}

export default RemindersWidget
