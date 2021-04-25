import React,{ useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { config } from './editorConfig';
import { NoteContext } from './../Context/NoteContext';
import AddRoundedIcon  from '@material-ui/icons/AddRounded';

const useStyles = makeStyles({
  paper:{
    width:'100%',
    height:'100vh',
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
    padding:'5em 0',
    display:'flex',
    justifyContent:'center'
  },
  btn:{
    width:'16em'
  }
})
function NewNote() {
  const { notes, setNotes, title, category, categoryList, textInput, setTextInput, addCategory, handleChange, handleSubmit } = useContext(NoteContext);

  const params = useParams();
  const { id } = params;
  const classes = useStyles();
  console.log(notes, id);
  ClassicEditor.defaultConfig = config;

//TODO: Inputları doğru şekilde yerleştir.

  return (
      <>
        <Grid container>
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.header}>
              <Typography variant='h2'>Note Editor</Typography>
            </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={5}>
                <Grid item xs={2}>
                  <TextField id='standard-basic' inputRef={title} variant='outlined' label='Title' className={classes.Editor}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField inputRef={category} id='basic' variant='standard' label='Add Category' onKeyDown={(e) => e.key==='Enter' && addCategory(e)}/>
                  <Tooltip title='Add Category'>
                      <IconButton color='primary' onClick={addCategory}>
                          <AddRoundedIcon />
                      </IconButton>
                  </Tooltip>
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
                className='ck-content'
                onChange={handleChange}
              >
              </CKEditor>
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button type='submit' variant='contained' color='primary' className={classes.btn}>Save</Button>
              </Grid>
            </form>
          </Grid>
          </Paper>
        </Grid>
      </>
  )
}

export default NewNote
