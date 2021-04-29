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
//TODO: splide js kullan
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import NewNoteBtn from './NewNoteBtn'


const useStyles = makeStyles({
    slider:{
        // position:'relative',
        // maxWidth:'95%',
        padding:'10px 0px'
    },
    paper:{
        marginTop:'1.2em',
        maxWidth:'95%',
        padding:'1em',
        backgroundColor:'#161616',
        position:'relative',
    },
    noteCard:{
        backgroundColor:'#242424',
        width:'200px',
        height:'300px',
        margin:'0 auto',
        '&:hover':{
            cursor:'pointer',
            transform: 'scale(1.05)',
            transition:'.1s ease',
            
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
    title:{
        color:'#76cb01',
    },
    button:{
        alignSelf:'center', 
        order:'1', 
        marginLeft:'1.5em',
       //TODO: boyutu düzelt
    }
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
    const splideOptions={
        type        : 'slide',
        rewind      : true,
        gap         : '1em',
        pagination  : false,
        perPage     : 5,
        perMove     : 1,
        cover       : false,
        focus       : 'end',
        isNavigation: false,
        updateOnMove: true,
        drag        : true,
        trimSpace   : true,
        lazyLoad    : true,
        preloadPages: 0,
        slideFocus  : false,
        clones: 0,
        width: '1100px',
        height:325,
    }
    useEffect(() => {
        const savedItem = JSON.parse(localStorage.getItem('Notes'));
        if(savedItem && savedItem !== []) setNotes([...savedItem])
    },[])
    return (
        <>  
            <Grid item xs={12} md={12}>
                <Paper className={classes.paper} elevation={5}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h3' className={classes.title}>Notes</Typography>
                        </Grid>
                        <Grid item className={classes.button}>
                            <NewNoteBtn />
                        </Grid>

                    <Grid item xs={11} >
                    <Splide options={splideOptions} className={classes.slider}>
                        {notes.map((item,index) =>(
                            <SplideSlide key={index}>
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
                            </SplideSlide>
                        ))}
                    </Splide>
                    </Grid>
                    </Grid>

                </Paper>
            </Grid>
        </>
    )
}

export default NotesWidget
