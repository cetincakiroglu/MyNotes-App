import React,{ useState } from 'react'
import { Card, Typography, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteBtn from './Buttons/DeleteBtn'
import GoogleBtn from './Buttons/GoogleBtn'
import useWindowDimensions from './../../Hooks/useWindowDimensions';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    card:{
        minHeight:'130px',
        padding:'0.5em',
        backgroundColor:'#242424',
        transition:'.1s ease-in-out',
        '&:hover':{
            transform:'translateY(-5px)'
        }
    },
    locationIcon:{
        transform:'scale(0.8)',
        verticalAlign:'bottom'
    },
    divider:{
        display:'none'
    }
})

function EventCard({ item,index, deleteEvent, syncGoogle }) {
    const [showBtn, setShowBtn] = useState(false);
    const classes = useStyles();
    const { width } = useWindowDimensions();

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
        }

    })
    const mobileClasses = mobileStyles();
    return (
        <>
            <Card className={classes.card} onMouseOver={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <Grid container justifyContent='space-between' direction={`${width > 500 ? 'row' : 'column'}`}>
                    <Grid item xs={false} md={1}></Grid>
                    <Grid item xs={width > 500 ? 3 : 12} className={width < 500 ? mobileClasses.text : null}>
                        <Typography variant='body2'>{item.date}</Typography>
                        <Typography variant='body2'>{item.time}</Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={width > 500 ? 6 : 12} className={width < 500 ? mobileClasses.text : null}>
                        <Typography variant='h4' color='primary' noWrap>{item.name}</Typography>
                        <Typography variant='body1' noWrap>{item.summary}</Typography>
                        <Typography variant='body1'>{item.location} <LocationOnIcon className={classes.locationIcon}/></Typography>
                    </Grid>
                    <Divider className={width > 500 ? classes.divider : mobileClasses.divider}/>
                    <Grid item xs={width > 500 ? 1 : 12} className={width < 500 ? mobileClasses.buttonContainer : null}>
                        <DeleteBtn showBtn={showBtn} deleteEvent={deleteEvent} item={item}/>
                        <GoogleBtn showBtn={showBtn} syncGoogle={syncGoogle} item={item} index={index}/>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default EventCard
