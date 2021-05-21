import React,{ useState } from 'react'
import { Card, Typography, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteBtn from './Buttons/DeleteBtn'
import useWindowDimensions from './../../Hooks/useWindowDimensions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment'

const useStyles = makeStyles({
    card:{
        minHeight:'100px',
        padding:'10px',
        backgroundColor:'#242424',
        transition:'.1s ease-in-out',
        '&:hover':{
            transform:'translateY(-5px)'
        },
    },
    locationIcon:{
        transform:'scale(0.8)',
        verticalAlign:'bottom'
    },
    divider:{
        display:'none'
    },
    container:{
        margin:'auto'
    }
})

function EventCard({ item,index, deleteEvent, syncGoogle }) {
    const [showBtn, setShowBtn] = useState(false);
    const { width } = useWindowDimensions();
    
    // conditional styling
    const mobileStyles = makeStyles({
        buttonContainer:{
            display:'flex',
            justifyContent:'space-evenly',
        },
        text:{
            textAlign:'center',
            verticalAlign:'bottom',
            padding:'10px'
        },
        divider:{
            display:'block',
        },
    })
    
    const mobileClasses = mobileStyles();
    const classes = useStyles();

    return (
        <>
            <Card className={classes.card} onMouseOver={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <Grid container justify='space-between' alignItems='center' direction={`${width > 500 ? 'row' : 'column'}`} spacing={1}>
                    <Grid item xs={width > 500 ? 4 : 12} className={width < 500 ? mobileClasses.text : null}>
                        <Typography variant='body2'>{moment(item.start.dateTime).format('MMMM Do, h:mm A')}</Typography>
                        <Typography variant='body2'>{moment(item.end.dateTime).format('MMMM Do, h:mm A')}</Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={width > 500 ? 6 : 12} className={width < 500 ? mobileClasses.text : null}>
                        <Typography variant='h4' color='primary' noWrap>{item.description}</Typography>
                        <div dangerouslySetInnerHTML={{__html: item.summary}}></div>
                        <Typography variant='body1'><LocationOnIcon className={classes.locationIcon}/>{item.location}</Typography>
                    </Grid>
                    <Divider className={width > 500 ? classes.divider : mobileClasses.divider}/>
                    <Grid item xs={width > 500 ? 1 : 12} className={width < 500 ? mobileClasses.buttonContainer : null} align='center'>
                        <DeleteBtn showBtn={showBtn} deleteEvent={deleteEvent} item={item}/>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default EventCard
