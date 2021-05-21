
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { NoteContext } from './../Context/NoteContext'
import { config } from './editorConfig';

const useStyles = makeStyles({
  paper:{
    width:'100%',
    minHeight:'100vh',
    padding:'0 2em',
    borderRadius:'0',
  },
  form:{
    margin:'2em 0em'
  },
  header:{
    margin:'2em 0'
  },
  btn:{
    width:'100px',
    margin: '0 auto !important',
  },
  categories:{
      verticalAlign:'text-bottom'
  }
})

function LargeEditor() {
  const { notes, title, category, categoryList, setCategoryList, textInput, setNoteId, header, addCategory, handleChange, handleSubmit } = useContext(NoteContext);
  
  const params = useParams();
  const { id } = params;
  const classes = useStyles();  
  ClassicEditor.defaultConfig = config;

  useEffect(() => {
    let noteObject = notes.filter(item => item.id === id);
    setNoteId([id])
    
    let categoryArr = noteObject.categories ? noteObject.categories : '';
    setCategoryList([...categoryArr]);
    // eslint-disable-next-line
  },[])

  return (
      <>
        <Paper className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={3} justify='center'>
           <Grid item xs={3}>
            <TextField inputRef={title} placeholder={header} id='basic' variant='standard' />
          </Grid>
          <Grid item xs={3}>
            <TextField inputRef={category} id='basic' placeholder='Add category' variant='standard' aria-label='Add Category' onKeyDown={(e) => e.key==='Enter' && addCategory(e)} />
          </Grid>
          <Grid item xs={12} className={classes.editorContainer}>
          <CKEditor
              config={config}
              editor={ClassicEditor}
              data={textInput}
              onChange={handleChange}
              >
              </CKEditor>
          </Grid>
          <Grid item xs={12}>
                  <Typography variant='body1' className={classes.categories}>Categories:
                      {categoryList.length > 0 ? categoryList.map(item => (
                        `#${item}`
                    )): ''}
                  </Typography>
                </Grid>
          <Grid>
          <Grid item xs={2} alignSelf='center'>
                <Button type='submit' variant='contained' color='primary' className={classes.btn}>Save</Button>
            </Grid>
          </Grid>
        </Grid>
        </form>
          </Paper>
      </>
  )
}

export default LargeEditor
