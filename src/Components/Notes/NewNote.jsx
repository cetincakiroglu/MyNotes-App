import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { config } from './editorConfig';
import { NoteContext } from './../Context/NoteContext'
import AddRoundedIcon  from '@material-ui/icons/AddRounded'

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
  buttonContainer:{
    display:'flex',
    justifyContent:'center'
  },
  btn:{
    width:'100px'
  },
  ckEditor:{
    height:'85vh !important'
  }
})
function NewNote() {
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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField id='standard-basic' inputRef={title} placeholder={header} style={{width:'100%'}} />
          </Grid>
          <Grid item xs={4}>
            <TextField inputRef={category} id='basic' variant='standard' label='Add Category' onKeyDown={(e) => e.key==='Enter' && addCategory(e)} style={{width:'100%'}}/>
          </Grid>
          <Grid item xs={12}>
          <CKEditor
                config={config}
                editor={ClassicEditor}
                data={textInput}
                onChange={handleChange}
                
              >
              </CKEditor>
          </Grid>
          <Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
                <Button type='submit' variant='contained' color='primary' className={classes.btn}>Save</Button>
              </Grid>
          </Grid>
        
            {/* <Grid item xs={12} className={classes.header}>
              <Typography variant='h2'>Note Editor</Typography>
            </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={5} style={{padding:'2em 0em'}}>
                <Grid item xs={4}>
                  <TextField id='standard-basic' inputRef={title} placeholder={header} variant='outlined' style={{width:'100%'}}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField inputRef={category} id='basic' variant='standard' label='Add Category' onKeyDown={(e) => e.key==='Enter' && addCategory(e)} style={{width:'80%'}}/>
                  <Tooltip title='Add Category'>
                      <IconButton color='primary' onClick={addCategory}>
                          <AddRoundedIcon />
                      </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body1' className={classes.categories}>Categories:
                      {categoryList.length > 0 ? categoryList.map(item => (
                        `#${item}`
                    )): ''}
                  </Typography>
                </Grid>
              </Grid>
              <CKEditor
                config={config}
                editor={ClassicEditor}
                data={textInput}
                onChange={handleChange}
              >
              </CKEditor>
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button type='submit' variant='contained' color='primary' className={classes.btn}>Save</Button>
              </Grid>
            </form>
          </Grid> */}
        </Grid>
          </Paper>
      </>
  )
}

export default NewNote
