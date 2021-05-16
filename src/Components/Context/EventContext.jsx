import React, { createContext, useRef, useEffect, useState, useContext } from 'react'
import { db } from '../Auth/firebase'
import { AuthContext } from './AuthContext';
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'


export const EventContext = createContext();
export const EventProvider = props => {
    const [eventList, setEventList] = useState([]);
    const [dbLoading, setDbLoading] = useState(false); // will be used later to make spinner
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const eventName = useRef();
    const eventSummary = useRef();
    const eventLocation = useRef();

    const { currentUser } = useContext(AuthContext)
    
    // db ref
    const eventsRef = db.collection('Events');

    // get Events collection
    function getEvents(){
        if(currentUser){
            setDbLoading(true);
            eventsRef.where('creator.email', '==', currentUser.email).onSnapshot(querySnapshot => {
                const items= [];
                querySnapshot.forEach(doc => {
                   items.push(doc.data())
                });
                setDbLoading(false);
                setEventList(items);
            })
        }
    }

    // add to db
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            id       :uuidv4(),
            kind     :'calendar#event',
            // created  : 'timestamp',
            location : eventLocation.current.value,
            summary  : eventSummary.current.value,
            description: eventName.current.value,
            status   : 'confirmed',
            creator  : {
                email: currentUser.email ? currentUser.email : 'unknown',
                self: true
            },
            organizer: {
                email: currentUser.email ? currentUser.email : 'unknown',
                self:true,
            },
            start: {
                // dateTime: startDate.current.value,
                dateTime: moment(startDate).format(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                // dateTime: endDate.current.value,
                dateTime: moment(endDate).format(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            originalStartTime: {
                dateTime: moment(startDate).format(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            htmlLink: null,
            eventType:'default',
            reminders: {
                overrides: [
                    {method: 'email', minutes: 1440},
                    {method: 'email', minutes: 10}
                ]
            },
        }
        console.log(newEvent)

        eventsRef.doc(newEvent.id)
                 .set(newEvent)
                 .catch(err => console.log(err))

        setStartDate('');
        setEndDate('');
        eventName.current.value = '';
        eventSummary.current.value = '';
        eventLocation.current.value = '';
    }
    
    // delete from db
    const deleteEvent = (eventObj) => {
        console.log(eventObj)
        eventsRef.doc(eventObj.id)
                 .delete()
                 .catch(err => console.log(err))
    }
    
    // listen db
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    },[])

    const value={
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        getEvents,
        deleteEvent,
        eventName,
        eventSummary,
        eventLocation,
        handleSubmit,
        eventList,
        setEventList,
    };
    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    )
}