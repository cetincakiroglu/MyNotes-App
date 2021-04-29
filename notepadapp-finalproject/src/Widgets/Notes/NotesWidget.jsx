import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Grid, Typography, Card, CardContent, CardHeader, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/components/effect-coverflow/effect-coverflow.scss'
import SwiperCore, { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper'
import { NoteContext } from './../../Context/NoteContext'
import './swiper.css'


const useStyles = makeStyles({
    slider:{
        position:'relative',
        width:'90%',
        padding:'10px'
    },
    paper:{
        marginTop:'1.2em',
        maxWidth:'90%',
        height:'325px',
        backgroundColor:'#161616'
    },
    noteCard:{
        backgroundColor:'#242424',
        width:'177px',
        height:'300px',
        margin:'0 auto',
        '&:hover':{
            cursor:'pointer'
        }
    },
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        height:'3em',
        padding:'0.25em',
    },
    cardContent:{
        margin:'10px 0px',
        lineHeight: '1.5rem',
        maxHeight: '100%',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: '8',
    },
    subheader:{
        alignSelf:'flex-end'
    },
    header:{
        textOverflow:'ellipsis',
        whiteSpace:'nowrap'
     },
})


function NotesWidget() {
    const classes = useStyles();
    const { notes, setNotes, setTextInput, title, header, setHeader } = useContext(NoteContext);
    const history = useHistory();
    SwiperCore.use([Navigation, Pagination, A11y, EffectCoverflow])
    
    const openInLarge = (item) => {
        history.push(`/New/${item.id}`)
        setTextInput(item.note)
        let headerArr = header;
         headerArr.unshift(item.title);
        setHeader([...headerArr])
      
    }
    useEffect(() => {
        const savedItem = JSON.parse(localStorage.getItem('Notes'));
        if(savedItem && savedItem !== []) setNotes([...savedItem])
    },[])
    return (
        <>  
            <Grid item xs={12}>
                <Typography variant='h3'>Your Notes</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
                <Paper className={classes.paper} elevation={5}>
                        <Swiper
                        className={classes.slider}
                        loop='false'
                        navigation
                        pagination={{clickable: true}}
                        spaceBetween={10}
                        slidesPerView={4}
                        >
                            {notes.map((item,index) => (
                            <SwiperSlide key={index} onClick={() => openInLarge(item)} >
                                <Card className={classes.noteCard} key={item.id}>
                                    <div className={classes.cardHeader}>
                                        <Typography variant='h4'className={classes.header}> {item.title ? item.title : 'Untitled Note'} </Typography>
                                        <Typography variant='caption' className={classes.subheader}>{item.date}</Typography>
                                    </div>
                                        <Divider />
                                    <CardContent >
                                        <Typography variant='body2' className={classes.cardContent}>
                                            {item.note}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                </Paper>
            </Grid>
        </>
    )
}

export default NotesWidget
