import React,{ useState, useEffect } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles'
import EventCard from './EventCard'
import InputGroup from './InputGroup'

const useStyles = makeStyles({
    paper:{
        maxWidth:'95%',
        padding:'0em 15px',
        backgroundColor:'#161616',
        position:'relative',
        height:'500px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:0,
    },
    displayContainer:{
        maxHeight:'325px',
    },
    title:{
        margin:'20px 0px'
    },
    button:{
        marginLeft:'10px',
    }
})

function RemindersWidget() {
    const classes = useStyles();
    const [eventList, setEventList] = useState([]);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);

    let gapi = window.gapi;
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    let SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const syncGoogle = (obj) => {
        gapi.load('client:auth2', () => {
            console.log('loaded client');
            gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });

            gapi.client.load('calendar', 'v3', () => console.log('Calendar loaded!'));
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                var event = {
                    'summary': obj.eventName,
                    'location': obj.eventLocation,
                    'description': obj.eventSummary,
                    'start': {
                    'dateTime': new Date(obj.date + ' ' +obj.time).toISOString().slice(0,19),
                    'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                    'dateTime':  new Date(obj.date + ' ' +obj.time).toISOString().slice(0,19),
                    'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                    {'email': 'lpage@example.com'},
                    {'email': 'sbrin@example.com'}
                    ],
                    'reminders': {
                    'useDefault': true,
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
            })
        })
    }

    const deleteEvent = (num) => {
        let eventsArr = eventList;
        eventsArr.splice(num,1);
        setEventList([...eventsArr]);

        localStorage.setItem('Events', JSON.stringify(eventList));
    }

    useEffect(() => {
        let savedEvents = JSON.parse(localStorage.getItem('Events'))
        if(savedEvents && savedEvents !== []){
            setEventList([...savedEvents])
        }
    },[])
    return (
        <>
    
            <Paper className={classes.paper} elevation={5}>
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
                <Grid container>
                    <Grid container spacing={2} justify='center' >
                        {eventList.length > 0 ? eventList.map((item,index) => (
                            <Grid item xs={12}>
                                <EventCard item={item} index={index} key={item.id} eventList={eventList} setEventList={setEventList} deleteEvent={deleteEvent} syncGoogle={syncGoogle}/>
                            </Grid>
                        )): (<Typography variant='body1'>You have 0 upcoming events.</Typography>)}
                    </Grid>
                        <InputGroup openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer} eventList={eventList} setEventList={setEventList} />
                </Grid>
            </Paper>
        </>
    )
}

export default RemindersWidget
