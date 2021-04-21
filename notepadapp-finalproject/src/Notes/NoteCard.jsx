import React, { useContext, useEffect } from 'react'
import { Grid, Card, CardHeader, Typography, Divider, CardContent, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NoteContext } from './../Context/NoteContext';

const useStyles = makeStyles({
    header:{
        padding:'20px',
    },
    cardHeader:{
        display:'flex',
        flexDirection:'column-reverse',
    },
    subheader:{
        alignSelf:'flex-end',
        padding:'10px 20px 0px 20px'
    },
    cardText:{
        padding:'10px',
        lineHeight:'1.4rem'
    },
    cardBody:{
        margin:'10px 0px',
        lineHeight: '1.5rem',
        maxHeight: '100%',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: '8',
    },
    noteCard:{
        backgroundColor:'#3a3a3a',
        minWidth:'200px',
        minHeight:'300px',
        margin:'0 auto'
    },
    container:{
        margin:'20px'
    }
})

function NoteCard(props) {
    const classes = useStyles();
    return (
        <> 
        <Grid item xs={12} md={4} className={classes.container}>
            <Paper elevation={5}>
                <Card className={classes.noteCard}>
                    <div className={classes.cardHeader}>
                        <Typography variant='h4' className={classes.header}>
                            Untitled Note
                        </Typography>
                        <Typography variant='caption' className={classes.subheader}>
                            21.04.2021
                        </Typography>
                    </div>
                    <CardContent >
                        <Typography variant='body2' className={classes.cardText}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quibusdam numquam enim provident animi, neque maxime? Odio itaque officia recusandae est? Aperiam quod nesciunt consectetur sequi quae, impedit a adipisci!
                        </Typography>
                            <Divider />
                        <Typography variant='body1'>
                            #category1 #category2 #category3
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
        </>
    )
}

export default NoteCard
