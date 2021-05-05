import React,{ useState, useEffect, useContext } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles'
import EventCard from './EventCard'
import InputGroup from './InputGroup'
import {EventContext} from '../../Context/EventContext'

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
    const { eventList, setEventList, deleteEvent } = useContext(EventContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);

    let gapi = window.gapi;
    const syncGoogle = (obj) => {
       
        gapi.load('client:auth2', () => {
            console.log('loaded client');
            gapi.client.init({
                //TODO: make them environment variables, store in a dotenv file.
                apiKey:"AIzaSyAfdWsCAIswFGPpYuhXBNSUtVpv3uXIfjc",
                clientId:"504976774479-b967jfhn0f28in465kkbbk1fgl46nb5n.apps.googleusercontent.com",
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
