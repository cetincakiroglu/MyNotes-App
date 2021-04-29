import './editor.css'
import { Paper, Drawer, Tooltip, IconButton, Button, TextField, Typography } from '@material-ui/core'
import React,{ useContext } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { makeStyles } from '@material-ui/core/styles';
import { NoteContext } from './../Context/NoteContext';


const useStyles = makeStyles({
    paper:{
        minHeight:'100%',
        minWidth:'30vw',
        backgroundColor:'#161616',
        margin:'auto'
    },
    form:{
        padding:'2em',
        maxWidth:'28vw'
    },
    button:{
        width:'16em',
        margin:'4em auto 0 auto',
        display:'block'
    },
    buttonDisabled:{
        display:'none'
    },
    header:{
        margin:'1em 0',
        width:'100%'
    },
    categories:{
        margin:'1em 0'
    }
})
function NoteEditor({ open, setOpen }) {
    const {textInput, categoryList, title, category, addCategory, handleChange, handleSubmit } = useContext(NoteContext);
    const classes = useStyles();

    return (
        <>  
            <div>
                <Drawer open={open} anchor='right' onClose={() => setOpen(false)} >
                    <Paper elevation={5} className={classes.paper}>
                        <Tooltip title='Close'>
                            <IconButton color='secondary' onClick={() => setOpen(false)}>
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <div>
                            <form onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()} onSubmit={handleSubmit} className={classes.form}>
                                <TextField id='standard-basic' inputRef={title} variant='outlined' label='Title' className={classes.header}/>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={textInput}
                                    className='ck-content'
                                    onChange={handleChange}
                                    >
                                </CKEditor>
                                <div>
                                    <TextField inputRef={category} id='basic' variant='standard' label='Add Category' onKeyDown={(e) => e.key==='Enter' && addCategory(e)}/>
                                    <Tooltip title='Add Category'>
                                        <IconButton color='primary' onClick={addCategory}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Typography variant='body1' className={classes.categories}>Categories:
                                 {categoryList.map(item => (
                                    `#${item}`
                                ))}
                                </Typography>
                                <Button color='primary' type='submit' variant='contained' className={textInput ? classes.button : classes.buttonDisabled}>Save</Button>
                            </form>
                        </div>
                    </Paper>
                </Drawer>
            </div>
        
        </>
    )
}

export default NoteEditor
