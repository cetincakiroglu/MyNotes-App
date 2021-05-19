import React,{ useState, useContext } from 'react'
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles'
import EventCard from './EventCard'
import EventDrawer from './EventDrawer'
import { EventContext } from '../../Context/EventContext'

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
                    <Grid container spacing={3} justify='center' className={classes.container}>
                        {eventList.length > 0 ? eventList.map((item,index) => (
                            <Grid item xs={12} key={index}>
                                <EventCard item={item} index={index} eventList={eventList} setEventList={setEventList} deleteEvent={deleteEvent} />
                            </Grid>
                        )): (<Typography variant='body1' className={classes.subtitle}>You have 0 upcoming events.</Typography>)}
                    </Grid>
                        <EventDrawer openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer} eventList={eventList} setEventList={setEventList} />
            </Paper>
        </>
    )
}

export default RemindersWidget
