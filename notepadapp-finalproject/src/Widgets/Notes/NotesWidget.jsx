import React, { useContext, useEffect } from 'react'
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
        width:'100%',
    },
    paper:{
        marginTop:'1.2em',
        maxWidth:'730px',
        height:'325px'
    },
    noteCard:{
        backgroundColor:'#3a3a3a',
        minWidth:'177px',
        height:'300px',
        margin:'0 auto'
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
    const { notes, setNotes } = useContext(NoteContext);
    SwiperCore.use([Navigation, Pagination, A11y, EffectCoverflow])
    
    useEffect(() => {
        const savedItem = JSON.parse(localStorage.getItem('Notes'));
        if(savedItem && savedItem !== []) setNotes([...savedItem])
    },[])
    return (
        <>  <Grid container>
              <Grid item xs={12}>
                <Typography variant='h3'>Your Notes</Typography>
              </Grid>
            </Grid>
            <Paper className={classes.paper} elevation={5}>
                    <Swiper
                    className={classes.slider}
                    effect ='coverflow'
                    loop='true'
                    navigation
                    pagination={{clickable: true}}
                    spaceBetween={0}
                    slidesPerView={3}
                    onSlideChange={() => console.log('changed')}
                    onSwiper={swiper => console.log(swiper)}
                    >
                        {notes.map((item,index) => (
                        <SwiperSlide key={index}>
                            <Card className={classes.noteCard} key={item.id}>
                                <div className={classes.cardHeader}>
                                    <Typography variant='h4'className={classes.header}> {item.title} </Typography>
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
        </>
    )
}

export default NotesWidget
