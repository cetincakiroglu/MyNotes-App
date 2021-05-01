import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container,Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { NoteContext } from './../Context/NoteContext';

function LargeEditor() {
    
    return (
        <>
            <Container maxWidth='sm'>
                <Grid item xs={12} md={4}>
                    <Typography variant='h2'>Note Editor</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField />
                </Grid>
            </Container>
        </>
    )
}

export default LargeEditor
