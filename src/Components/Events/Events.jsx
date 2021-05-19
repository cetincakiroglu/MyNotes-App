import React, { useState, useContext, useEffect } from 'react'
import './events.css'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventDrawer from '../Widgets/Events/EventDrawer'
import { EventContext } from '../Context/EventContext'
import { AuthContext } from './../Context/AuthContext'
import moment from 'moment'

function Events() {
    const { gapi, eventList, setStartDate, setEndDate, eventsRef, getEvents } = useContext(EventContext)
    const { currentUser } = useContext(AuthContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);

    // handle calendar select
    const handleDateSelect = (selectInfo) => {
        console.log(eventList)
        setOpenInputDrawer(true);
        setStartDate(selectInfo.start)
        setEndDate(selectInfo.end)
        console.log(selectInfo);
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect();
    }
    
    // remove event
    const removeEvent = (clickInfo) => {
        const event_id = clickInfo.event.id;
        // eslint-disable-next-line
        if(confirm(`Are you sure to delete ${clickInfo.event.title}`)){
            clickInfo.event.remove();
        }
        gapi.client.load('calendar', 'v3', () => {
            var request = gapi.client.calendar.events.delete({
                'calendarId': 'primary',
                'eventId': event_id,
            });
            request.execute((res) => {
                if(res.error || res === false){
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

    // update event
    const handleDrag = (eventDropInfo) => {
        const newStart = eventDropInfo.event.start;
        const newEnd = eventDropInfo.event.end;
        const event_id = eventDropInfo.event.id;

        const event = gapi.client.calendar.events.get({'calendarId': 'primary', 'eventId': event_id})
        event.start = {
            'dateTime': moment(newStart).format(),
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        event.end = {
            'dateTime': moment(newEnd).format(),
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
        gapi.client.load('calendar', 'v3', () => {
            const request = gapi.client.calendar.events.patch({
                'calendarId': 'primary',
                'eventId' : event_id,
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

        // TODO: Updates Google, handle firestore
        // eventsRef.doc(event_id)
        // .update({})
        // .catch(err => console.error(err));
    }

    const getEventsFromDB = (fetchInfo, callback) => {
        retrieveData(fetchInfo.start, fetchInfo.end, callback);
    }

    const retrieveData = async (from, to, callback) => {
        try{
            const filteredData = await eventsRef
            .where('creator.email', '==', currentUser.email)
            .orderBy('created')
            // .startAt(from) --> something wrong
            // .endAt(to)
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

    // contents
    const eventContent = (eventInfo) => {
        return(
            <>
                <b>{eventInfo.event.title}</b>
                <i>{eventInfo.timeText}m</i>
            </>
        )
    }

    const sideBar = (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events</h2>
                  {eventList.map(item => (
                      <p><b>{moment(item.start.dateTime).format('h:mm A, MMMM Do')}</b>{item.description}</p>
                  ))}
                </div>
            </div>
    )
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    },[])
    return (
        <div className='demo-app'>
            {sideBar}
            <div className='demo-app-main'>
                <FullCalendar 
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left:'prev, next today',
                        center:'title',
                        right:'dayGridMonth, timeGridWeek, timeGridDay'
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
                    eventClick={removeEvent}
                    eventDrop={handleDrag}
                    // you can update a remote database when these fire:
                    // eventAdd={getEvents}
                    // eventChange={function(){}}
                    // eventRemove={function(){}}
                
                />
            </div>
            <EventDrawer setOpenInputDrawer={setOpenInputDrawer} openInputDrawer={openInputDrawer}/>
        </div>
    )
}

export default Events
