import React,{ useState, useEffect } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EventCard from './EventCard'
import InputGroup from './InputGroup'

const useStyles = makeStyles({
    paper:{
        minHeight:'30em',
        backgroundColor:'#161616',
        marginTop:'1.2em',
        padding:'1em'
    },
    displayContainer:{
        height:'80%'
    }
})

function RemindersWidget() {
    const classes = useStyles();
    const [eventList, setEventList] = useState([]);

    let gapi = window.gapi;
    let CLIENT_ID ='1013909302575-jilt3g3mv4d086ltntbqkbp01bj159hi.apps.googleusercontent.com';
    let API_KEY = 'AIzaSyBMp2omIXiiB8Ed5NtYImyE1lpAOQCpP14';
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    let SCOPES = "https://www.googleapis.com/auth/calendar.events";

    const syncGoogle = (obj) => {
        gapi.load('client:auth2', () => {
            console.log('loaded client');
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
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
            <Grid container>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h3'>Reminders</Typography>
                </Grid>
            </Grid>
            <Grid container>
            <Paper className={classes.paper} elevation={5}>
                <Grid container spacing={2} justify='center' className={classes.displayContainer}>
                    {eventList.length > 0 ? eventList.map((item,index) => (
                        <Grid item xs={12}>
                            <EventCard item={item} index={index} key={item.id} eventList={eventList} setEventList={setEventList} deleteEvent={deleteEvent} syncGoogle={syncGoogle}/>
                        </Grid>
                    )): 'You have 0 upcoming events'}
                </Grid>
                <Grid item xs={12}>
                    <InputGroup eventList={eventList} setEventList={setEventList} />
                </Grid>
            </Paper>
            </Grid>
        </>
    )
}

export default RemindersWidget
