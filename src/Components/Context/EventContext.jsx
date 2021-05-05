import React, { createContext, useRef, useEffect, useState, useContext } from 'react'
import { db } from '../Auth/firebase'
import { AuthContext } from './AuthContext';
import { v4 as uuidv4 } from 'uuid'

export const EventContext = createContext();
export const EventProvider = props => {
    const [eventList, setEventList] = useState([]);
    const [dbLoading, setDbLoading] = useState(false); // will be used later to make spinner

    const eventName = useRef();
    const eventDate = useRef();
    const eventTime = useRef();
    const eventSummary = useRef();
    const eventLocation = useRef();

    const { userID, currentUser } = useContext(AuthContext)

    // db ref
    const eventsRef = db.collection('Events');

    // get Events collection
    function getEvents(){
        setDbLoading(true);
        eventsRef.onSnapshot(querySnapshot => {
            const items= [];
            querySnapshot.forEach(doc => {
                items.push(doc.data())
            });
            setDbLoading(false);
            setEventList(items);
        })
    }

    // add to db
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            id         : uuidv4(),
            ownerID    : userID ? userID : 'unknown',
            ownerEmail : currentUser.email ? currentUser.email : 'unknown',
            date       : eventDate.current.value,
            time       : eventTime.current.value,
            name       : eventName.current.value,
            summary    : eventSummary.current.value,
            location   : eventLocation.current.value,
            timeZone   : Intl.DateTimeFormat().resolvedOptions().timeZone, 
        }
        eventsRef.doc(newEvent.id)
                 .set(newEvent)
                 .catch(err => console.log(err))
    }
    
    // delete from db
    const deleteEvent = (eventObj) => {
        console.log(eventObj)
        eventsRef.doc(eventObj.id)
                 .delete()
                 .catch(err => console.log(err))
    }

    const value={
        deleteEvent,
        eventName,
        eventDate,
        eventTime,
        eventSummary,
        eventLocation,
        handleSubmit,
        eventList,
        setEventList,
    };

    // listen db
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    },[])
    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    )
}