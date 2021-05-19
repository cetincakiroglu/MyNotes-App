import React, { createContext, useRef, useState, useContext, useEffect } from 'react'
import { db } from '../Auth/firebase'
import { AuthContext } from './AuthContext';
import moment from 'moment'

export const EventContext = createContext();
export const EventProvider = props => {
    const [eventList, setEventList] = useState([]);
    // eslint-disable-next-line
    const [dbLoading, setDbLoading] = useState(false); // will be used later to make spinner
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [summary, setSummary] = useState('');
    const eventName = useRef();
    // const eventSummary = useRef();
    const eventLocation = useRef();

    const { currentUser } = useContext(AuthContext)
    
    // db ref
    const eventsRef = db.collection('Events');

    // delete from db
    const deleteEvent = (eventObj) => {
        const event_id = eventObj.id.split('_',1).join('');
        console.log(event_id)
        gapi.client.load('calendar', 'v3', () => {
            var request = gapi.client.calendar.events.delete({
                'calendarId': 'primary',
                'eventId': event_id,
            });
            request.execute((res) => {
                if(res.error || res == false){
                    console.log('error', res.error)
                }else {
                    console.log('EVENT DELETED');
                }
            })
        })
        eventsRef.doc(event_id)
                 .delete()
                 .catch(err => console.log(err))
    }
    
    // init gapi
    const gapi = window.gapi;
    // init client
   function initClient(){
        gapi.load('client', () => {
            console.log('CLIENT LOADED');
                gapi.client.init({
                apiKey:process.env.REACT_APP_GOOGLE_API_KEY,
                clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar",
            });
            gapi.client.load('calendar', 'v3', () => console.log('CALENDAR LOADED'))
        })
    }

    // get events from Google Calendar
    const getCalendar = () => {
        gapi.client.calendar.events.list({
            calendarId:'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
        }).then(res => {
            // save to db
            console.log(res.result.items)
            res.result.items.forEach(item => {
               eventsRef.doc(item.id.split('_',1).join('')).set(item).catch(err => console.error(err))
            }) 
        })
    }

    // get events collection from db
    function getEvents(){
        if(currentUser){
            setDbLoading(true);
            eventsRef.where('creator.email', '==', currentUser.email).onSnapshot(querySnapshot => {
                const items = [];
                querySnapshot.forEach(doc => {
                   items.push(doc.data())
                });
                setDbLoading(false);
                setEventList(items);
            })
        }
    }

    // insert events
    const insertEvent = (e) => {
        e.preventDefault();
        var event = {
            'summary': summary,
            'location': eventLocation.current.value,
            'description': eventName.current.value,
            'start': {
                'dateTime': moment(startDate).format(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'end': {
                'dateTime': moment(endDate).format(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
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
            'calendarId':'primary',
            'resource': event
        })
        // add event to db & Google Calendar
        request.execute((event) => {
            const event_id = event.result.id.split('_',1).join('');
            eventsRef.doc(event_id)
                     .set(event.result)
                     .catch(err => console.log(err));
                     console.log('EVENT CREATED', event)
                     console.log('EVENT ID', event.result.id)
        })
        // reset inputs
        setStartDate('');
        setEndDate('');
        eventName.current.value = '';
        // eventSummary.current.value = '';
        eventLocation.current.value = '';
        // call calendar API to refresh
        getCalendar();
    }

    // get Events collection from db
   
    const value={
        getCalendar,
        initClient,
        insertEvent,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        getEvents,
        deleteEvent,
        eventName,
        summary,
        setSummary,
        eventLocation,
        eventList,
        setEventList,
        eventsRef
    };

    useEffect(() => {
        initClient();
        // eslint-disable-next-line
    },[])
    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    )
}