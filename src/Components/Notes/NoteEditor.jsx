import './editor.css'
import { Paper, Drawer, Tooltip, IconButton, Button, TextField, Typography } from '@material-ui/core'
import React,{ useContext } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { makeStyles } from '@material-ui/core/styles';
import { NoteContext } from './../Context/NoteContext';
import useWindowDimensions from './../Hooks/useWindowDimensions';

function NoteEditor({ open, setOpen }) {
    const { width } = useWindowDimensions();
    const { textInput, categoryList, title, category, addCategory, handleSubmit, setTextInput } = useContext(NoteContext);
    const useStyles = makeStyles({
        paper:{
            height:'100vh',
            backgroundColor:'#161616',
            margin:'auto',
        },
        form:{
            padding:'0em 2em',
            width: width > 600 ? '30vw' : '80vw',
            minHeight:'600px',
        },
        button:{
            width:'16em',
            margin:'2em auto 0 auto',
            display:'block'
        },
        buttonDisabled:{
            display:'none'
        },
        title:{
            margin:'1em 0',
            width:'100%'
        },
        categories:{
            margin:'1em 0',
            overflow:'hidden',
            textOverflow:'ellipsis',
        }
    })
    const classes = useStyles();
    const handleChange = (e,editor,obj) => {
        const data = editor.getData();
        setTextInput(data)
    }

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
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField id='standard-basic' inputRef={title} variant='outlined' label='Title' className={classes.title}/>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={textInput}
                                    className='ck-content'
                                    onChange={handleChange}
                                    >
                                </CKEditor>
                                <div>
                                    <TextField inputRef={category} id='basic' variant='standard' label='Add Category' />
                                    <Tooltip title='Add Category'>
                                        <IconButton color='primary' onClick={addCategory}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Typography variant='body1' className={classes.categories}>Categories:
                                 {categoryList.map(item => (
                                    <span key={item}>#{item}</span>
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
